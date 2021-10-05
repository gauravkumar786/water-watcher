const mongoose = require('mongoose');
const Joi = require('joi');

const Payments = mongoose.model('Payments', new mongoose.Schema({
    type: String, // order or subscribtion
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        default : null
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default : null
    },
    amount: Number,
    paymentDetails: Object,
    status: { type: Number, default: 0 },
}));

exports.Payments = Payments;