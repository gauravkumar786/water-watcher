const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { Partner, validate } = require('../models/partner');
const express = require('express');
const router = express.Router();

router.post('/', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const partner = new Partner(req.body);
  await partner.save();
  res.send(partner);
});

router.get('/', [auth, admin], async function(req, res) {
  const partners = await Partner.find()
    .select({ companyName: 1, contactName: 1, contactEmail: 1, isBlocked: 1 });
  res.send(partners);
});

router.get('/:id', [auth, admin], async function(req, res) {
  const partner = await Partner.findById(req.params.id);
  res.send(partner);
});

router.put('/:id', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const result = await Partner.update({ _id: req.params.id }, {
    $set: req.body
  });
  res.send(result);
});

router.post('/:id/block', [auth, admin], async function(req, res) {
  const result = await Partner.update({ _id: req.params.id }, {
    $set: {
      isBlocked: true
    }
  });
  res.send(result);
});

module.exports = router;