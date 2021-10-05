const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
  const totalClient     = await User.find({ role: 2 }).count();
  const totalSubscribed = await User.find({ role: 2 }).count();
  const totalOrder      = await Order.find().count();

  let orderArr = [];
  orderArr.push({ ["Jan"] : 10});
  orderArr.push({ ["Feb"] : 23});
  orderArr.push({ "Mar" : 20});
  orderArr.push({ "Apr" : 10});
  orderArr.push({ "May" : 30});
  orderArr.push({ "Jun" : 40});
  orderArr.push({ "Jul" : 5});
  orderArr.push({ "Aug" : 12});
  orderArr.push({ "Sep" : 30});
  orderArr.push({ "Oct" : 25});
  orderArr.push({ "Nov" : 45});
  orderArr.push({ "Dec" : 50});

  let dashboard = {};
  dashboard['totalClient']      = totalClient;
  dashboard['totalSubscribed']  = totalSubscribed;
  dashboard['totalOrder']       = totalOrder;
  dashboard['orders']           = orderArr;

  console.log("dashboard =>>",dashboard);
  res.send({ "data" : dashboard });
});

module.exports = router;