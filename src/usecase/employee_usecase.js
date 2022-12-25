class EmployeeUseCase {
  constructor(employeeRepository, addressRepository) {
    this.employeeRepository = employeeRepository;
    this.addressRepository = addressRepository;
  }

  async getAllEmployee(params) {
    const result = {
      isSuccess: true,
      statusCode: null,
      message: null,
      data: [],
      pagination: {},
    };

    const page = params.page ?? 1;
    const limit = parseInt(params.limit ?? 10);
    const offset = parseInt((page - 1) * limit);
    const include = ["addresses"];
    const orderBy = params.orderBy ?? "createdAt";
    const orderDirection = params.orderDir ?? "DESC";

    const order = [[orderBy, orderDirection]];
    const employees = await this.employeeRepository.getAll(params, {
      offset,
      limit,
      order,
      include,
    });

    const start = 0 + (page - 1) * limit;
    const end = page * limit;
    const countFiltered = employees.count;

    result.pagination = {
      totalRow: employees.count,
      totalPage: Math.ceil(countFiltered / limit),
      page,
      limit,
    };

    if (end < countFiltered) {
      result.pagination.next = {
        page: page + 1,
      };
    }

    if (start > 0) {
      result.pagination.prev = {
        page: page - 1,
      };
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employees.rows;

    return result;
  }

  async getEmployeeById(id) {
    const result = {
      isSuccess: false,
      statusCode: 404,
      message: null,
      data: null,
    };

    const include = ["addresses"];
    const employee = await this.employeeRepository.getById(id, { include });

    if (employee === null) {
      result.statusCode = 404;
      result.isSuccess = false;
      result.message = "employee not found!";
      return result;
    }

    const data = employee;

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = data;
    return result;
  }

  async createEmployee(data) {
    let result = {
      isSuccess: false,
      statusCode: 400,
      reason: null,
      data: null,
    };
   
    let yearDate = new Date().toISOString().replace('-', ' ').split('T')[0].replace('-', ' ').slice(2).split(' ')
    data.id = yearDate[0]+yearDate[2]+'0000'

    const employee = await this.employeeRepository.create(data);

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

    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }

    await this.employeeRepository.update(data, id);

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

    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }

    await this.employeeRepository.delete(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = EmployeeUseCase;
