import { Controller } from '@nestjs/common';
import { CustomerService } from '../services';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
}
