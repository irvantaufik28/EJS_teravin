const Joi = require('joi').extend(require('@joi/date'));

const EmployeePayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  birthDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  addresses: Joi.array()
    .items(
      Joi.object({
        address: Joi.string().required(),
        isDefault: Joi.boolean(),
      }),
    )
    .min(1)
    .required()
    .label('Address'),

});

module.exports = { EmployeePayloadSchema };
