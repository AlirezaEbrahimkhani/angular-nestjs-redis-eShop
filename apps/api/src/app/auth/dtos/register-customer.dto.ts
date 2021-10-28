export interface RegisterCustomerDTO {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    img_urls?: string[];
  }
  