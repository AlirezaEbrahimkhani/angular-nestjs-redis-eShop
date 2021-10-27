import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';
import { Customer } from '../../customer/models';
import { DataResponese, ListName } from '../../shared';
import { RegisterCustomerDTO } from '../dtos';

@Injectable()
export class AuthService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async registerNewCustomer(registerCustomerDTO: RegisterCustomerDTO) {
    let allCustomers: Object = await this._fetchAllCustomers();
    let usernameExits = this._checkUsernameExistence(
      allCustomers,
      registerCustomerDTO.username
    );
    if (usernameExits) return new DataResponese([], false, 'Username Exists !');

    allCustomers = {
      ...allCustomers,
      [registerCustomerDTO.username]: new Customer(registerCustomerDTO),
    };
    this.redisCacheService
      .set(ListName.CUSTOMERs, allCustomers)
      .then(() => {
        return new DataResponese([], true);
      })
      .catch((err) => {
        if (err) return new DataResponese([], false);
      });
  }

  private _checkUsernameExistence(allCustomers: Object, username: string) {
    return Object.keys(allCustomers).includes(username);
  }

  private async _fetchAllCustomers(): Promise<Object> {
    let customers: Object = await this.redisCacheService.get(
      ListName.CUSTOMERs
    );
    return customers;
  }
}
