import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
    employeeService = app.get<EmployeeService>(EmployeeService);
  });

  describe('createEmployee', () => {
    it('create new employee and should return a new employee ID', () => {
      const result = { id: 'unique-id' };
      jest.spyOn(employeeService, 'createEmployee').mockImplementation(() => result.id);

      expect(employeeController.createEmployee({ name: 'Ankitesh', age: 30 })).toEqual(result);
    });
  });

  describe('getEmployee', () => {
    it('should return employee data', () => {
      const result = { name: 'Ankitesh', age: 30 };
      jest.spyOn(employeeService, 'getEmployee').mockImplementation(() => result);

      expect(employeeController.getEmployee('unique-id')).toEqual(result);
    });

    it('should return "Employee not found" for invalid id', () => {
      jest.spyOn(employeeService, 'getEmployee').mockImplementation(() => undefined);

      expect(employeeController.getEmployee('invalid-id')).toEqual({ error: 'Employee not found' });
    });
  });

  describe('getEmployees', () => {
    it('should return an array of all employees', () => {
      const result = [{ name: 'Ankitesh', age: 30 }];
      jest.spyOn(employeeService, 'getEmployees').mockImplementation(() => result);

      expect(employeeController.getEmployees()).toEqual(result);
    });
  });
});

