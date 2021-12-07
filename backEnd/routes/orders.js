const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const STRIPE_KEY =
  "sk_test_51K3yNwCg0qtN0mvWfsVjQGlSKpyvcO0fj73c6sg2TUr5Qi1dbBIGv553dMuFiqHOs2Rl9azYCIjEhQXfT4FjX5sy00jtdC82OG";
const stripe = require("stripe")(STRIPE_KEY);

router.post("/add", async (req, res) => {
  try {
    let product = await Product.findByPk(req.body.productId);
    console.log(product);

    if (!product) throw new Error("No Product Found");

    // const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //         price: '{{PRICE_ID}}',
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     success_url: `${YOUR_DOMAIN}/success.html`,
    //     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    //   });

    const charge = await stripe.charges.create({
        amount: product.price,
        currency: 'usd',
        source: 'tok_mastercard',
        description: product.description,
      });

    const newOrder = await Order.create({
      productId: req.body.productId,
      stripe_id: charge.id,
      total: charge.amount,
      status: charge.paid ? "Paid" : "Failed",
    });

    console.log("Order Created: ", newOrder);

    return res.status(200).json({
      data: newOrder,
      stripe: charge,
      status: true,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      data: null,
      status: false,
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    let response = await Order.findAll();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(402).json({
      error: error,
      data: [],
      status: false,
    });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await Order.findAll({
      where: {
        orderId: id,
      },
    });

    return res.status(200).json(response[0]);
  } catch (error) {
    return res.status(402).json({
      error: error,
      data: [],
      status: false,
    });
  }
});

router.get("/config", async (req, res) => {
    try {
        stripe.accounts.list(
            {limit: 10},
            function(err, accounts) {
              if (err) {
                return res.status(500).send({
                  error: err.message
                });
              }
              return res.send({
                accounts,
                publicKey:"pk_test_51K3yNwCg0qtN0mvWSw8Ua6Qnii4mHaF9rYvRGmuJaDEV1cvhHkV8ixDymKhCPkUvwBPPNhaSzIhXiHO5OcMSuDvw00Uv13J7td",
                basePrice: "1",
                currency: "usd",
              });
            }
          );
    } catch (error) {
      return res.status(402).json({
        error: error,
        data: [],
        status: false,
      });
    }
  });

module.exports = router;
