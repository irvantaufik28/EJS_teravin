class EmployeeUseCase {
  constructor(employeeRepository) {
    this.EmployeeRepository = employeeRepository;
  }

  async getAllEmployee(limit, page) {
    let result = {
      isSuccess: true,
      statusCode: null,
      reason: null,
      data: [],
      pagination: {},
    };

    const employees = await this.EmployeeRepository.getAll(limit, page);

    let start = 0 + (page - 1) * limit;
    let end = page * limit;
    let countFiltered = employees.count;

    result.pagination.totalRow = employees.count;
    result.pagination.totalPage = Math.ceil(countFiltered / limit);
    result.pagination.page = page;
    result.pagination.limit = limit;

    if (end < countFiltered) {
      result.pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (start > 0) {
      result.pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employees.rows;
    result.pagination;

    return result;
  }

  async getEmployeeById(id) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
      data: null,
    };

    const employee = await this.EmployeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employee;
    return result;
  }

  async createEmployee(data) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      reason: null,
      data: null,
    };
   
    let employeeDate = data.birthDate.toISOString().replace('-', ' ').split('T')[0].replace('-', ' ').slice(2).split(' ')
    data.id = employeeDate[0]+employeeDate[2]

    const employee = await this.EmployeeRepository.create(data);

    result.isSuccess = true;
    result.statusCode = 201;
    result.data = employee;
    return result;
  }

  async updateEmployee(data, id) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      reason: null,
      data: null,
    };

    const employee = await this.EmployeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }

    await this.EmployeeRepository.update(data, id);

    result.isSuccess = true;
    result.statusCode = 201;
    return result;
  }

  async deleteEmployee(id) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      reason: null,
      data: null,
    };

    const employee = await this.EmployeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }

    await this.EmployeeRepository.delete(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = EmployeeUseCase;
