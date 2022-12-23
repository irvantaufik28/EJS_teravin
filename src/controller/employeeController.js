const resData = require("../helper/response");

module.exports = {
  getAllEmployee: async (req, res, next) => {
    try {
      const result = await req.employeeUC.getAllEmployee();

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getEmployeeById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.employeeUC.getEmployeeById(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  createEmployee: async (req, res, next) => {
    try {
      const student = {

        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate)
      };

      const result = await req.employeeUC.createEmployee(student);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  updateEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        majorId: req.body.majorId,
      };

      const result = await req.employeeUC.updateEmployee(student, id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  deleteEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.employeeUC.deleteEmployee(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};