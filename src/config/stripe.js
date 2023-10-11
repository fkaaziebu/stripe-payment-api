const Stripe = require("stripe");

const stripe = Stripe('sk_test_51NrPGIC1JzpCkXscdeQjqJj2zSf3lGVjWTiYK4rwFrDhqVdBZa3WBuZTwPo9DkuEiMYnac1B3dYlkGBqLUI2TAPF00NxhjZHAS', {
  apiVersion: "2023-08-16",
  typescript: false,
});

module.exports = { stripe };
