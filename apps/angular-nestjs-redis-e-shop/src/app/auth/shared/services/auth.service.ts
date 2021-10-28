import { Injectable } from '@angular/core';
import { ApiRequest, GlobalService } from '../../../core';
import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private globalService: GlobalService) {}

  login(model: Login) {
    return ApiRequest('POST')
      .Controller('auth')
      .Action('login')
      .Body(model)
      .call(this.globalService);
  }

  register(model: Register) {
    return ApiRequest('POST')
      .Controller('auth')
      .Action('register')
      .Body(model)
      .call(this.globalService);
  }
}
