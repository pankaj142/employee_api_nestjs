import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmployeeService {
  private dataStore = new Map<string, { name: string; age: number }>();

  // Store employee name and age with a unique ID
  createEmployee(name: string, age: number): string {
    const id = uuidv4();
    this.dataStore.set(id, { name, age });
    return id;
  }

  // Retrieve employee 
  getEmployee(id: string) {
    return this.dataStore.get(id);
  }

  // Get all employees
  getEmployees() {
    let data = {};
    for (const [key, value] of this.dataStore.entries()) {
        data[key] = value;
    }
    return data;
  }
}
