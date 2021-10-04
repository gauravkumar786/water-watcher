const mongoose = require('mongoose');
const Joi = require('joi');

const Order = mongoose.model('Order', new mongoose.Schema({
    orderNumber: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    email: String,
    phone: String,
    location: String,
    address: String,
    postCode: String,
    propertyType: String,
    deliverySize: Number,
    quantity: Number,
    price: Number,
    comments: String,
    date: { type: Date, default: Date.now },
    status: { type: Number, default: 0 },
}));

exports.Order = Order;