const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { SubscriptionPlan, validate } = require('../models/subscription_plan');
const express = require('express');
const router = express.Router();

router.post('/', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const subscriptionPlan = new SubscriptionPlan(req.body);
  await subscriptionPlan.save();
  res.send(subscriptionPlan);
});

router.get('/', [auth, admin], async function(req, res) {
  const subscriptionPlans = await SubscriptionPlan.find()
    .select({ name: 1, duration: 1, price: 1, isActive: 1 });
  res.send(subscriptionPlans);
});

router.get('/:id', [auth, admin], async function(req, res) {
  const subscriptionPlan = await SubscriptionPlan.findById(req.params.id);
  res.send(subscriptionPlan);
});

router.put('/:id', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const result = await SubscriptionPlan.update({ _id: req.params.id }, {
    $set: req.body
  });
  res.send(result);
});

router.put('/:id/active_inactive', [auth, admin], async function(req, res) {
  const result = await SubscriptionPlan.update({ _id: req.params.id }, {
    $set: {
      isActive: req.body.action
    }
  });
  res.send(result);
});

module.exports = router;