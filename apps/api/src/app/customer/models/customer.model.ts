import { CartStatus } from "./cart-status.model";

export interface CustomerInterface {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  img_urls: string[];
  products_in_cart: string[];
  cart_status: CartStatus;
}
