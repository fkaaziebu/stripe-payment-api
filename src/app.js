const express = require("express");
const StripeRouter = require("./stripe/StripeRouter");
// const StripeWebHook = require("./middleware/StripeWebHook");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Middleware function
// app.use(StripeWebHook);

// Stripe
app.use(StripeRouter);

module.exports = app;
