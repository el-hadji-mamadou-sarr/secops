document.addEventListener('DOMContentLoaded', async () => {
  const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY)
  const elements = stripe.elements()
  const card = elements.create('card', { hidePostalCode: true })
  card.mount('#card-element')

  const form = document.getElementById('payment-form')
  const errorMessage = document.getElementById('card-errors')
  const submitBtn = form.querySelector('[type="submit"]')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorMessage.textContent = ''
    submitBtn.disabled = true
    submitBtn.textContent = 'Processing...'

    const name = form.querySelector('input[name="first_name"]')?.value || ''
    const email = form.querySelector('input[name="email"]')?.value || ''

    // CHANGE IS HERE!
    let clientSecret
    try {
      const resp = await fetch('http://127.0.0.1:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: 'bike' }],
          email,
          name,
        }),
      })
      const data = await resp.json()
      console.log('Payment Intent Response:', data)
      if (!resp.ok || !data.clientSecret)
        throw new Error(data.error || 'Payment failed')
      clientSecret = data.clientSecret
    } catch (err) {
      errorMessage.textContent = err.message
      submitBtn.disabled = false
      submitBtn.textContent = 'Order and Pay'
      return
    }

    const { paymentIntent, error: stripeError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: { name, email },
        },
      })

    if (stripeError) {
      errorMessage.textContent = stripeError.message
      submitBtn.disabled = false
      submitBtn.textContent = 'Order and Pay'
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      form.innerHTML = `
        <p class="text-green-700 font-semibold text-center mt-8 text-xl">
          Payment succeeded! Thank you for your order.
        </p>
      `
    }
  })
})
