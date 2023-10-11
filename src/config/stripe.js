const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2023-08-16",
  typescript: false,
});

module.exports = { stripe };
