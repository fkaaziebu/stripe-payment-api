const express = require("express");
const db = require("../config/db");
const { stripe } = require("../config/stripe");

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const signature = req.header["stripe-signature"];

  let event;

  try {
    // UI generated here
    console.log("[It worked]");

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      "whsec_3558f706fae91c9ddf1e11c6ba27fc280f7390b5dee425b1aad1d41455ddc1cd"
    );

  } catch (error) {
    return res.status(400).send({ error: `Webhook Error: ${error.message}` });
  }

  const session = event.data.object;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    if (!session?.metadata?.email) {
      return res.status(400).send({ msg: "User email is required" });
    }

    await db.userSubscription.create({
      data: {
        userEmail: session?.metadata?.email,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    await db.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  res.send({ msg: "Payment successful" }).status(200);
});

module.exports = router;
