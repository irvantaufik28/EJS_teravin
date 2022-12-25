const { EmployeePayloadSchema } = require('./schema');
const resData = require('../../../helper/response');

const EmployeePayloadValidator = {
  EmployeeValidation: async (req, res, next) => {
    const { error } = EmployeePayloadSchema.validate(req.body);

    if (error) {
      return res.status(400).json(resData.failed(error.message, error.details));
    }

    next();
  },
};

module.exports = EmployeePayloadValidator;
