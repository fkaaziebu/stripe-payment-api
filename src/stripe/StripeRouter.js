const express = require("express");
const StripeService = require("./StripeService");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/api/stripe",
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Email is invalid"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ message: "Input error messages" }).status(401);
    }

    try {
      const { email } = req.body;
      const stripeSession = await StripeService.create(email);
      console.log("[PAYMENT SUCCESSFUL]");

      return res.send({
        url: stripeSession.url,
      });
    } catch (error) {
      console.log("[STRIPE_ERROR]", error);
    }
  }
);

module.exports = router;
