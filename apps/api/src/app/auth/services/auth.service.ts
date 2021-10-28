import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';
import { Customer } from '../../customer/models';
import { DataResponese, ListName } from '../../shared';
import { LoginCustomerDto, RegisterCustomerDTO } from '../dtos';

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
      .set(ListName.CUSTOMERS, allCustomers)
      .then(() => {
        return new DataResponese([], true);
      })
      .catch((err) => {
        if (err) return new DataResponese([], false);
      });
  }

  private _checkUsernameExistence(allCustomers: Object, username: string) {
    return allCustomers ? Object.keys(allCustomers).includes(username) : false;
  }

  private async _fetchAllCustomers(): Promise<Object> {
    let customers: Object = await this.redisCacheService.get(
      ListName.CUSTOMERS
    );
    return customers;
  }

  async loginCustomer(loginCustomerDto: LoginCustomerDto): Promise<Object> {
    const user = await this._validateUserPassword(loginCustomerDto);
    if (!user)
      throw new UnauthorizedException('incorrect username or password !');
    return new DataResponese(
      {
        username: loginCustomerDto.username,
        products_in_cart: user.products_in_cart,
      },
      true,
      'Login Successfully !'
    );
  }

  async _validateUserPassword(
    loginCustomerDto: LoginCustomerDto
  ): Promise<any> {
    let allCustomers: Object = await this._fetchAllCustomers();
    const { username, password } = loginCustomerDto;
    let usernameExits = this._checkUsernameExistence(allCustomers, username);
    if (usernameExits) {
      return allCustomers[username].password === password
        ? { products_in_cart: allCustomers[username].products_in_cart }
        : false;
    } else false;
  }
}
