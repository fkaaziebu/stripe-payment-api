const { stripe } = require("../config/stripe");

const create = async (email) => {
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: "https://vpass-nextjs.vercel.app/",
    cancel_url: "https://vpass-nextjs.vercel.app/",
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Johnson Donation Platform",
            description: "Donate to support children",
          },
          unit_amount: 500,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      email,
    },
  });

  return stripeSession;
};

// const create = async (email) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 500,
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   return paymentIntent;
// };

module.exports = {
  create,
};
