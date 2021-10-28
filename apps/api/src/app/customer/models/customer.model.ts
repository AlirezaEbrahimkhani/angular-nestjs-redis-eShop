import { CartStatus } from './cart-status.model';
import { v4 as uuidv4 } from 'uuid';

export class Customer {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  img_urls: string[];
  products_in_cart: string;
  constructor(registerCustomerDTO) {
    this.username = registerCustomerDTO.username ?? '';
    this.password = registerCustomerDTO.password ?? '';
    this.first_name = registerCustomerDTO.first_name ?? '';
    this.last_name = registerCustomerDTO.last_name ?? '';
    this.email = registerCustomerDTO.email ?? '';
    this.phone_number = registerCustomerDTO.phone_number ?? '';
    this.img_urls = registerCustomerDTO.img_urls ?? [];
    this.products_in_cart = registerCustomerDTO.products_in_cart ?? uuidv4();
  }
}
