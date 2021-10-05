const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send('User already registered.');


  // Get next Id
  const autoIncId = await User.find().count()+1;

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.userId = autoIncId;

  await user.save();
  res.send(user);

  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

router.put('/', async function(req, res) {
  const result = await Partner.update({ _id: req.params.id }, {
    $set: {
      isBlocked: true
    }
  });
  res.send(result);

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send('User already registered.');

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);

  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

// router.get('/', async function(req, res) {
//   const users = await User.find();
//   res.send(users);
// });

module.exports = router;