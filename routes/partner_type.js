const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { PartnerType, validate } = require('../models/partner_type');
const express = require('express');
const router = express.Router();

router.post('/', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const partnertype = new PartnerType(req.body);
  await partnertype.save();
  res.send(partnertype);
});

router.get('/', [auth, admin], async function(req, res) {
  const partnertypes = await PartnerType.find()
    .select({ companyName: 1, contactName: 1, contactEmail: 1, isBlocked: 1 });
  res.send(partnertypes);
});

router.get('/:id', [auth, admin], async function(req, res) {
  const partnertype = await PartnerType.findById(req.params.id);
  res.send(partnertype);
});

router.put('/:id', [auth, admin], async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const result = await PartnerType.update({ _id: req.params.id }, {
    $set: req.body
  });
  res.send(result);
});

module.exports = router;