import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';
import { Customer } from '../models';
import { DataResponese, ListName } from '../../shared';

@Injectable()
export class CustomerService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getAllCustomer() {
    let customers: Object = await this.redisCacheService.get<[Customer]>(
      ListName.CUSTOMERS
    );

    return new DataResponese<Customer>(customers);
  }
}
