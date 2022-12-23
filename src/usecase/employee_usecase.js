class EmployeeUseCase {
    constructor(employeeRepository) {
      this.EmployeeRepository = employeeRepository;
    }
  
    async getAllEmployee(filters) {
      let result = {
        isSuccess: true,
        statusCode: null,
        reason: null,
        data: [],
      };
  
      const employees = await this.EmployeeRepository.getAll(filters);
  
      result.isSuccess = true;
      result.statusCode = 200;
      result.data = employees;
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
  
      return
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