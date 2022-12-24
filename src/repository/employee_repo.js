const { Op } = require('sequelize');
const { Employee } = require('../models');

class EmployeeRepository {
  constructor() {
    this._EmployeeModel = Employee;
  }

  async getAll(limit , offset) {
    const result = await this._EmployeeModel.findAndCountAll({
      order: [['id', 'desc']],
      limit: limit,
      offset: offset
    });
    return result;
  }

  async getByNameOrEmailOrMobile(employee) {
    let condition = []
    condition.push({ name: { [Op.like]: "%" + employee + "%" } })
    const result = await this._EmployeeModel.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        [Op.or] : [{name:employee}, {email: employee}, {mobile: employee}]
      }
    });
    return result;
  }

  async getById(id) {
    const result = await this._EmployeeModel.findOne({
      where: {
        id,
      },
    });
    return result;
  }
  async update(address, id) {
    const result = await this._EmployeeModel.update(address, {
      where: {
        id,
      },
    });
    return result;
  }

  async create(address) {
    const result = await this._EmployeeModel.create(address);
    return result;
  }
}

module.exports = EmployeeRepository;