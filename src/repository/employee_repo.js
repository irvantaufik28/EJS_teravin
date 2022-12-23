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

  async getAllBydescending() {
    const result = await this._EmployeeModel.findAndCountAll({
      order: [['id', 'asc']]
    });
    return result;
  }

  async getId(id) {
    const result = await this._EmployeeModel.findOne({
      where: {
        id,
      },
    });
    return result;
  }
  async update(student, id) {
    const result = await this._EmployeeModel.update(student, {
      where: {
        id,
      },
    });
    return result;
  }

  async create(student) {
    const result = await this._EmployeeModel.create(student);
    return result;
  }
}

module.exports = EmployeeRepository;