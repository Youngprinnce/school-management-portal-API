const joi = require("joi");

const sessionSchema = joi.object().keys({
    start: joi.date().required(),
    end: joi.date().required(),
    year: joi.string().required(),
    new_payment: joi.number().integer(),
    returning_payment: joi.number().integer(),
});

module.exports = {
    sessionSchema
};