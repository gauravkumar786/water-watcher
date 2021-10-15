const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const number = require('joi/lib/types/number');
const boolean = require('joi/lib/types/boolean');

const partnerSchema = new mongoose.Schema({
    partnerId: String,
    partnerType: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    companyName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    contactName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    contactEmail: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    contactMobile: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    contactAddress: {
        type: String,
        required: true,
    },
    truckInformation: [Array],
    isBlocked: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

const Partner = mongoose.model('Partner', partnerSchema);

function validatePartner(partner) {
    const schema = {
        partnerId: Joi.string().min(5).max(50).required(),
        partnerType: Joi.string().min(5).max(50).required(),
        companyName: Joi.string().min(5).max(50).required(),
        contactName: Joi.string().min(5).max(50).required(),
        contactEmail: Joi.string().min(5).max(50).required(),
        contactMobile: Joi.string().min(5).max(50).required(),
        contactAddress: Joi.string().required(),
        truckInformation: Joi.required()
    };

    return Joi.validate(partner, schema);
}

exports.Partner = Partner;
exports.validate = validatePartner;