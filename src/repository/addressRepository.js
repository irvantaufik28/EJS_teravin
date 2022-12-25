const { Address } = require("../models");

class AddressRepository {
  constructor() {
    this._AddressModel = Address;
  }

  async getAll() {
    const result = await this._AddressModel.findAndCountAll();
    return result;
  }

  async getMainByEmployeeId(employeeId) {
    const result = await this._AddressModel.findOne({
      where: {
        employeeId,
        mainAddress: true,
      },
    });
    return result;
  }

  async getByEmployeeId(employeeId) {
    const result = await this._AddressModel.findOne({
      where: {
        employeeId,
      },
    });
    return result;
  }
  async update(address, id) {
    const result = await this._AddressModel.update(address, {
      where: {
        id,
      },
    });
    return result;
  }

  async create(address) {
    const result = await this._AddressModel.create(address);
    return result;
  }
}

module.exports = AddressRepository;
