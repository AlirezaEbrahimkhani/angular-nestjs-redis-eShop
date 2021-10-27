import { Body, Controller, Post } from '@nestjs/common';
import { LoginCustomerDto, RegisterCustomerDTO } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginCustomer(@Body() loginCustomerDto: LoginCustomerDto) {
    const responseData = await this.authService.loginCustomer(loginCustomerDto);
    return responseData;
  }

  @Post('/register')
  registerNewCustomer(@Body() registerCustomerDTO: RegisterCustomerDTO) {
    let insertResponse =
      this.authService.registerNewCustomer(registerCustomerDTO);
    return insertResponse;
  }
}
