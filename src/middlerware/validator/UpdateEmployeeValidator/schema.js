const Joi = require('joi').extend(require('@joi/date'));

const schema = Joi.object().keys({
  name: Joi.string().required().optional(),
  email: Joi.string().email().required().optional(),
  mobile: Joi.string()
    .regex(/^[0-9]*$/)
    .required()
    .optional(),
  birthDate: Joi.date().format('YYYY-MM-DD').utc().required()
    .optional(),
  addresses: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer(),
        address: Joi.string().required(),
        isDefault: Joi.boolean(),
      }),
    )
    .min(1)
    .required()
    .optional()
    .label('Address'),
});

module.exports = { schema };
