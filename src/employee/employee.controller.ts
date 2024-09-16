import { Controller, Post, Body, Param, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // 1. API to create new employee
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))  // Enables validation and sanitization
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): { id: string } {
    const { name, age } = createEmployeeDto;
    const id = this.employeeService.createEmployee(name, age);
    return { id };
  }

  // 2. API to get an employee using unique id
  @Get(':id')
  getEmployee(@Param('id') id: string) {
    const data = this.employeeService.getEmployee(id);
    if (!data) {
      return { error: 'Employee not found' };
    }
    return data;
  }

  // 3. API to get all employees
  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }
}
