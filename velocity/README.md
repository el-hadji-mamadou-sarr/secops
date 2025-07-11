
# 🚴‍♂️ Velocity Wheels E-Commerce

Modern, performant, and beautifully designed **e-commerce platform** for custom bicycles and cycling gear.

![Velocity Wheels Banner](assets/images/banner.jpg) <!-- Replace with your actual banner if available -->

---

## 🌟 Overview

**Velocity Wheels** is a full-stack e-commerce site focused on user experience, smooth interactivity, and secure Stripe payments. The project is built with:
- Responsive, accessible front-end (HTML5, TailwindCSS, vanilla JS).
- Fast and simple Node.js/Express/Stripe API backend.
- Modular asset pipeline for rich UI, carousels, counters, and animations.

Perfect as a foundation for any stylish e-comm, MVP, hackathon, or startup!

---

## 🛠️ Tech Stack

- **Front-end**:  
  - HTML5 + [Tailwind CSS](https://tailwindcss.com/) (custom theming, typography, breakpoints)
  - Custom vanilla JS for UI (menu, modals, accordions, etc.)
  - [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) for smooth animations
  - [Swiper.js](https://swiperjs.com/) for mobile sliders & carousels
  - [Stripe.js](https://stripe.com/docs/js) for payment forms and Elements
  - [Alpine.js-inspired](https://alpinejs.dev/) select dropdowns
  - `vanilla-counter.js` for animated stat counters

- **Back-end**:  
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (REST API)
  - [Stripe](https://stripe.com/docs/api) SDK for secure payments
  - CORS for local dev/testing

- **Tooling**:  
  - Prettier plugin for Tailwind CSS sorting/formatting
  - All assets and dependencies bundled as static files, no build step needed

---

## ✨ Features

- **Modern Landing/Homepage** with banners, featured products, hero CTAs
- **Product Collections**: dynamic listings, categories, color options, counters
- **Full Cart Drawer**: accessible everywhere, toggle with animations
- **Checkout with Stripe**: secure payments via Stripe Elements & PaymentIntent API
- **Animated UI**: GSAP-powered transitions, scroll reveals, and on-scroll counters
- **Carousels/Sliders**: Swiper.js for responsive galleries
- **Accessible Menus & Modals**: mobile nav, overlays, user/profile modal
- **Responsive Design**: mobile-first, custom Tailwind breakpoints up to 2XL
- **Custom Theming**: Aeonik/Roboto fonts, unique color palette (teal, purple, bleach, etc.)
- **Loader & Visual Feedback**: page loader, error handling, real-time status
- **Current Year Auto-update**: never update footer years again
- **No Framework Lock-in**: all JS is vanilla/ES5 for easy migration

---

## 📁 Project Structure

```
/
├── assets/
│   ├── images/
│   ├── css/
│   │   └── style.css
│   ├── custom.js
│   ├── gsap.min.js
│   ├── scrolltrigger.min.js
│   ├── swiper-bundle.min.js
│   ├── stripe.js
│   ├── select.min.js
│   └── vanilla-counter.js
├── index.html
├── cycle-collections.html
├── cart.html
├── package.json (backend)
├── server.js      (backend API)
└── tailwind.config.js
```

---

## 🚀 Getting Started

### 1. **Clone & Install**
```bash
git clone https://github.com/yourusername/velocity-wheels.git
cd velocity-wheels
npm install       # for backend (Express + Stripe)
```

### 2. **Start Backend**
```bash
node server.js
```
The API runs on [http://localhost:4242](http://localhost:4242)

### 3. **Run Front-End**
Open `index.html` directly in your browser (all files are static, no build step required).  
For local dev with backend integration, use a simple server (like VSCode Live Server, Python `http.server`, or [serve](https://www.npmjs.com/package/serve)).

> **Note:**  
> Stripe payments require both backend and frontend running.  
> Update Stripe API keys with your own test/live keys for production!

---

## 🔒 Stripe Integration

- **Frontend:**  
  - `assets/stripe.js` loads Stripe Elements in checkout, mounts card input.
  - On payment form submit, fetches `clientSecret` from `/create-payment-intent` backend endpoint.
  - Confirms payment using Stripe's secure UI components.

- **Backend:**  
  - `server.js` handles `/create-payment-intent`, using Stripe secret key.
  - Receives cart items, name, and email from frontend.
  - Returns `clientSecret` for front-end confirmation.
  - **Amount**: (Currently hardcoded at `$9,999.00` for demo).
  - **Security**:  
    - Use `.env` to store your Stripe secret keys (never commit live keys).
    - CORS is open for demo; restrict in production.

---

## 🎨 TailwindCSS Customization

- **Custom config in `tailwind.config.js`**:
  - Custom colors: teal, purple, bleach, gray, etc.
  - Aeonik/Roboto font stacks.
  - Extra-large container, mobile breakpoints.
  - Enhanced typography and button variants.
  - Plugins: Forms and Typography.

- **How to Extend:**  
  - Edit `tailwind.config.js` to add new color themes, utilities, or breakpoints.
  - Add more CSS in `assets/css/style.css` for utility overrides or new classes.

---

## 💡 Asset Usage Guide

- **custom.js**: Core UI logic, toggles, accordions, cart, select, counters, loader, modals.
- **gsap.min.js + scrolltrigger.min.js**: Advanced, buttery-smooth animations on scroll and interaction.
- **swiper-bundle.min.js**: Carousels—initialize in your HTML with Swiper classes.
- **stripe.js**: Payment form and Stripe Elements (mounts automatically).
- **select.min.js**: Powers custom select drop-downs (with Alpine-style data).
- **vanilla-counter.js**: Add animated counters anywhere with `[data-vanilla-counter]` attributes.

---

## 🖥️ Architecture Overview

- **Front-end:**  
  - All static HTML/CSS/JS files, no framework, minimal dependencies.
  - Easily extensible to SPA (React, Vue, Svelte) or static site generator if needed.

- **Back-end:**  
  - Single Express server (API only, no SSR), optimized for Stripe integration.
  - Easy to connect to any DB for orders/customers if you wish to extend.

- **Assets:**  
  - All JS libraries bundled, ready to use via `<script>` tags.
  - Modular: add/remove features with ease.

---

## 📦 Customization & Extension

- **Add More Pages:**  
  - Duplicate any HTML, update navigation.
  - Reuse modals, overlays, and carts from the main components.

- **Integrate DB / User Auth:**  
  - Add MongoDB/Postgres/SQL and JWT/passport for real user accounts.

- **Advanced Product Logic:**  
  - Connect products and collections to a CMS or DB.
  - Use real item IDs and dynamic pricing in `server.js`.

- **Modernize (optional):**  
  - Move to React/Vue and use same design and assets.
  - Use Vite or Webpack to bundle assets for production.

---

## 🧪 Testing & QA

- **Payments:**  
  - Use Stripe test cards in checkout for safe payment testing.
  - See [Stripe's docs](https://stripe.com/docs/testing) for test scenarios.

- **Mobile/Responsiveness:**  
  - Fully responsive via Tailwind—test on various devices.

- **Accessibility:**  
  - Modals, drawers, overlays, and forms follow accessible patterns.

---

## 📚 Credits & Open Source Libraries

- [TailwindCSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Swiper.js](https://swiperjs.com/)
- [Stripe.js](https://stripe.com/docs/js)
- [Alpine.js](https://alpinejs.dev/) (select logic inspiration)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

---

## 📝 License

MIT License — free to use, modify, and build your own awesome stores!

---

## 👨‍💻 Author & Contributions

Built by [Your Name](https://github.com/yourusername)  
Feel free to fork, open issues, and send PRs!

---

## 🚦 Deployment Notes

- **Production:**  
  - Set proper environment variables for Stripe keys.
  - Use [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or [Render](https://render.com/) for static hosting.
  - Deploy backend (Express API) on [Render](https://render.com/), [Heroku](https://heroku.com/), or [Railway](https://railway.app/).
  - Add SSL (HTTPS) for Stripe to work in live mode.

---

## 📢 Contact

Questions or feedback?  
Open an [issue](https://github.com/yourusername/velocity-wheels/issues) or email your@email.com.

---

> _Pedal faster. Sell smarter. Enjoy the ride!_
