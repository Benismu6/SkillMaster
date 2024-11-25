import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => (
  <Elements stripe={stripePromise}>
    <div>
      <h1>Welcome to SkillMaster</h1>
      <CheckoutForm /> {/* Render the payment form */}
    </div>
  </Elements>
);

export default App;
