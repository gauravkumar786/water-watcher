const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const number = require('joi/lib/types/number');
const boolean = require('joi/lib/types/boolean');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },   
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    city: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    suburb: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,   
        maxlength: 20
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    role: Number,
    isBlocked: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, role: this.role }, 'weaterWatcher123');
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        suburb: Joi.string().min(5).max(50).required(),
        city: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(20).required(),
        role: Joi.number().required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;