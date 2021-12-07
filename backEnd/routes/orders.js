const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/add", async (req, res) => {
  try {

    let product = await Product.findByPk(req.body.productId);
    console.log(product)

    if(!product) throw new Error("No Product Found")

    const newOrder = await Order.create({
      productId: req.body.productId,
      stripe_id: req.body.stripe_id,
      total: product.price,
      status: req.body.status
      
    });

    console.log("Order Created: ", newOrder);

    return res.status(200).json({
      data: newOrder,
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
                orderId: id
            }
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

module.exports = router;
