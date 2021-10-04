const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async function(req, res) {
  const users = await User.find()
    .select({ firstName: 1, lastName: 1, email: 1, phone: 1, address: 1, isBlocked: 1 });
  res.send(users);
});

router.get('/:id', [auth, admin], async function(req, res) {
  const user = await User.findById(req.params.id).populate('orders');
  res.send(user);
});

router.post('/:id/block', [auth, admin], async function(req, res) {
  const result = await User.update({ _id: req.params.id }, {
    $set: {
      isBlocked: true
    }
  });
  res.send(result);
});

module.exports = router;