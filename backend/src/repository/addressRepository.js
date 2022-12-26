const { EmployeeAddress } = require('../models');

class AddressRepository {
  constructor() {
    this.addressModel = EmployeeAddress;
  }

  async getAll() {
    const result = await this.addressModel.findAndCountAll();
    return result;
  }

  async getMainByEmployeeId(employeeId) {
    const result = await this.addressModel.findOne({
      where: {
        employeeId,
        mainAddress: true,
      },
    });
    return result;
  }

  async getByEmployeeId(employeeId) {
    const result = await this.addressModel.findOne({
      where: {
        employeeId,
      },
    });
    return result;
  }

  async create(address) {
    const result = await this.addressModel.create(address);
    return result;
  }

  async update(address, id) {
    const result = await this.addressModel.update(address, {
      where: {
        id,
      },
    });
    return result;
  }

  async delete(condition) {
    await this.addressModel.destroy({
      where: condition,
    });
  }
}

module.exports = AddressRepository;
