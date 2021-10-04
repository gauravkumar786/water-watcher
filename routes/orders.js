const auth = require('../middleware/auth');
const { Order } = require('../models/order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', auth, async function(req, res) {
  let findValues = { status: req.query.status }
  if (req.user.role == 1) {
    findValues.user = req.user._id;
  }
  const orders = await Order
    .find(findValues)
    .select('user phone date')
  res.send(orders);
});

router.get('/:id', async function(req, res) {
  const order = await Order.findById(req.params.id);
  res.send(order);
});

router.post('/', auth, async function(req, res) {
  try {
    // const schema = {     
    //   userId: Joi.required(),
    //   orderNumber: Joi.required(),
    //   quantity: Joi.required(),
    //   price: Joi.required(),
    //   date: Joi.required(),
    // }
    // let { orderNumber, quantity, price } = req.body;
    // let data = {
    //   orderNumber,
    //   quantity,
    //   price,
    // }
    // const result = Joi.validate(req.body, schema);
    // if(result.error) {
    //   throw result.error.details[0].message;
    // }
    
    const order = new Order(req.body);
    order.user = req.user._id;
    const _result = await order.save();
    res.send(_result);
  }
  catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;