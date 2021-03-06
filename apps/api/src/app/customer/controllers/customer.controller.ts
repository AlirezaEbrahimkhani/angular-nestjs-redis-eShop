import { Controller, Get } from '@nestjs/common';
import { DataResponese } from '../../shared';
import { CustomerService } from '../services';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomers(): Promise<DataResponese<Object>> {
    let data = this.customerService.getAllCustomer();
    return data;
  }
}
