const resData = require("../helper/response");

module.exports = {
  getAllAddressByEmployeeId: async (req, res, next) => {
    try {
      let limit = parseInt(req.query.record);
      let page = parseInt(req.query.page);
     
      const result = await req.addressUC.ggetAllAddressByEmployeeId(limit, page);

      return res.status(result.statusCode).json(resData.success({data: result.data, pagination: result.pagination}));
    } catch (error) {
      next(error);
    }
  },

  getMainAddressByEmployeeId: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.addressUC.getMainAddressByEmployeeId(id);

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

  createAddress: async (req, res, next) => {
    try {
      const student = {

        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: new Date(req.body.birthDate)
      };

      const result = await req.addressUC.createAddress(student);

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
  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        majorId: req.body.majorId,
      };

      const result = await req.addressUC.updateAddress(student, id);

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

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.addressUC.deleteAddress(id);

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