class EmployeeUseCase {
  constructor(employeeRepository, addressRepository) {
    this.employeeRepository = employeeRepository;
    this.addressRepository = addressRepository;
  }

  async getAllEmployee(limit, page) {
    let result = {
      isSuccess: true,
      statusCode: null,
      reason: null,
      data: [],
      pagination: {},
    };

    const employees = await this.employeeRepository.getAll(limit, page);

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
    const address = await this.addressRepository.getMainByEmployeeId(id)
    const employee = await this.employeeRepository.getById(id);
    if (employee === null) {
      result.isSuccess = false;
      result.reason = "employee not found!";
      return result;
    }
    const monthName = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    let date = employee.birthDate.getDate()
    let year = employee.birthDate.getFullYear()
    let month = monthName[employee.birthDate.getMonth()];

    let birthDate = `${date} ${month} ${year}`
    
    const employeeValue = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      birthDate,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      address
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = employeeValue;
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
