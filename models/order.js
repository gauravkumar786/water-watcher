const mongoose = require('mongoose');
const Joi = require('joi');

const Order = mongoose.model('Order', new mongoose.Schema({
    orderId: { type: Number, default: 0 },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        default : null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: String,
    deliverySize: Number,
    quantity: Number,
    price: Number,
    comments: String,
    date: { type: Date, default: Date.now },
    status: { type: Number, default: 0 },
}));

exports.Order = Order;