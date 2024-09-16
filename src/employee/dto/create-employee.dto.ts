import { IsString, Length, IsInt, Min, Max } from 'class-validator';
export class CreateEmployeeDto { // validate name and age 
  @IsString()
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(18)
  @Max(65)
  age: number;
}
