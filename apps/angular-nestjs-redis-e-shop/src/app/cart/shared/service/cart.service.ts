import { Injectable } from '@angular/core';
import { ApiRequest, GlobalService } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private globalService: GlobalService) {}

  getCartProuct(cartUUID: string) {
    return ApiRequest('GET')
      .Controller('cart')
      .Action(cartUUID)
      .call(this.globalService);
  }

  cartPayment(cartUUID: string) {
    return ApiRequest('POST')
      .Controller('cart')
      .Action(`pay/${cartUUID}`)
      .call(this.globalService);
  }
}
