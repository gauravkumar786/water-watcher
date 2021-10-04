const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const number = require('joi/lib/types/number');
const boolean = require('joi/lib/types/boolean');

const subscriptionPlanSchema = new mongoose.Schema({ 
    name:  String,
    price: Number,
    duration: Number,  
    description: String,
    isActive: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
});


// Getter
subscriptionPlanSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
});
  
// Setter
subscriptionPlanSchema.path('price').set(function(num) {
    return num * 100;
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

function validateSubscriptionPlan(subscriptionPlan) {
    const schema = {
        name: Joi.string().required(),
        price: Joi.number().required(),
        duration: Joi.number().required(),
        description: Joi.string().required(),
    };

    return Joi.validate(subscriptionPlan, schema);
}

exports.SubscriptionPlan = SubscriptionPlan;
exports.validate = validateSubscriptionPlan;