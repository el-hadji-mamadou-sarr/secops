require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use your **Secret Key** here!

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  console.log('Received request to create payment intent:', req.body);
  try {
    const { items, email, name } = req.body;

    // Calculate price based on items (for demo, fixed price)
    const amount = 999900; // $9,999.00 in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      description: 'Velocity Roadster Bike',
      metadata: {
        customer_name: name || '',
        item_id: items && items[0]?.id,
      },
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Optional: Health check
app.get('/', (_, res) => res.send('Stripe backend running.'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
