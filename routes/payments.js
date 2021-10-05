const auth = require('../middleware/auth');
const { Payments } = require('../models/payments');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', auth, async function(req, res) {  
  const payments = await Payments.find();
  res.send(payments);
});

router.get('/:id', async function(req, res) {
  const payments = await Payments.findById(req.params.id);
  res.send(payments);
});

router.post('/', auth, async function(req, res) {
  try {   
    const payments = new Payments(req.body);
    payments.user = req.user._id;
    const _result = await payments.save();
    res.send(_result);
  }
  catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;