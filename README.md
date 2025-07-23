# kalsXprezz - Consignment Marketplace with Flight Booking

A modern, secure web application combining consignment marketplace functionality with flight booking services, built with React, TypeScript, and Stripe for secure payments.

## 🚀 Features

### Consignment Marketplace
- Browse and search consignment items
- Advanced filtering (price, condition, location, category)
- Interactive item details and seller ratings
- Secure shopping cart with Stripe integration
- Wishlist functionality

### Flight Booking System
- Flight search with multiple filters
- Real-time flight tracking
- Booking management
- Travel insurance options
- Interactive flight maps

### Security & Payments
- **Stripe Integration**: Industry-standard secure payment processing
- **PCI DSS Compliant**: No sensitive card data stored locally
- **Tokenized Payments**: Only payment references stored
- **SSL Encryption**: All transactions encrypted

## 🔒 Payment Security

This application uses Stripe for secure payment processing:

- ✅ **No card details stored locally**
- ✅ **PCI DSS compliant payment processing**
- ✅ **Tokenized payment methods**
- ✅ **Industry-standard encryption**
- ✅ **Fraud protection included**

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Replace the placeholder in `src/components/StripeProvider.tsx`:

```typescript
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

4. Set up your backend to handle payment intents (see Backend Setup below)

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Dependencies

### Core
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- Tailwind CSS 3.4.1

### Payment Processing
- @stripe/stripe-js
- @stripe/react-stripe-js

### UI & Icons
- lucide-react 0.344.0

## 🏗️ Backend Setup (Required for Production)

To handle payments securely, you'll need a backend server. Here's a basic Node.js/Express example:

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');
const app = express();

app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, payment_method_id, customer_info } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: true,
      metadata: {
        customer_name: customer_info.name,
        customer_email: customer_info.email,
      },
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_API_URL=http://localhost:3001
```

## 🚀 Deployment

### Frontend Deployment
The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
Deploy your payment processing server to:
- Heroku
- AWS Lambda
- Google Cloud Functions
- DigitalOcean App Platform

## 🔐 Security Best Practices

1. **Never store card details**: All sensitive data handled by Stripe
2. **Use HTTPS**: Always serve over secure connections
3. **Validate server-side**: Never trust client-side data
4. **Monitor transactions**: Set up Stripe webhooks for real-time updates
5. **Regular updates**: Keep dependencies updated

## 📱 Features Overview

### User Authentication
- Secure login/registration
- User profile management
- Session management

### Shopping Experience
- Advanced product filtering
- Real-time search
- Interactive maps
- Responsive design

### Payment Processing
- Multiple payment methods
- Subscription support (ready)
- Refund handling
- Transaction history

### Flight Services
- Real-time flight data
- Booking management
- Travel insurance
- Flight tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For payment-related issues:
- Check Stripe Dashboard for transaction details
- Review server logs for API errors
- Ensure webhook endpoints are configured

For general support:
- Check the browser console for errors
- Verify all environment variables are set
- Ensure backend server is running

## 🔄 Updates

### Version 2.0.0
- ✅ Stripe payment integration
- ✅ Secure checkout process
- ✅ PCI DSS compliance
- ✅ Enhanced security measures
- ✅ Payment method tokenization

### Upcoming Features
- Multi-currency support
- Subscription payments
- Advanced analytics
- Mobile app version