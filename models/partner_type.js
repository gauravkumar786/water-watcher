const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const number = require('joi/lib/types/number');
const boolean = require('joi/lib/types/boolean');

const partnerTypeSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const PartnerType = mongoose.model('PartnerType', partnerTypeSchema);

function validatePartnerType(partnerType) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(partnerType, schema);
}

exports.PartnerType = PartnerType;
exports.validate = validatePartnerType;