const auth = require('../middleware/auth');
const { Order } = require('../models/order');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', auth, async function(req, res) {
  let findValues = { status: req.query.status }
  if (req.user.role == 2) {
    findValues.user = req.user._id;
  }
  const orders = await Order.find(findValues).populate('user').populate('plan');
  res.send(orders);
});

router.get('/:id', async function(req, res) {
  const order = await Order.findById(req.params.id);
  res.send(order);
});

router.post('/', auth, async function(req, res) {
  try {

    // Get next Id
    const autoIncId = await Order.find().count()+1;

    const order = new Order(req.body);
    order.user = req.user._id;
    order.orderId = autoIncId;
    const _result = await order.save();
    res.send(_result);
  }
  catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;