import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataResponese } from '../../shared';
import { RegisterCustomerDTO } from '../dtos';
import { CustomerService } from '../services';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomers(): Promise<DataResponese<Object>> {
    let data = this.customerService.getAllCustomer();
    return data;
  }

  @Post()
  registerNewCustomer(@Body() registerCustomerDTO: RegisterCustomerDTO) {
    let insertResponse =
      this.customerService.registerNewCustomer(registerCustomerDTO);
    return insertResponse;
  }
}
