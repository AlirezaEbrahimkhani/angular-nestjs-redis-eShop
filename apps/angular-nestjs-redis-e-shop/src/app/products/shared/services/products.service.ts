import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequest, GlobalService } from '../../../core';
import { ApiResponse } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private globalService: GlobalService) {}

  getAllProducts(): Observable<ApiResponse<any>> {
    return ApiRequest('GET').Controller('product').call(this.globalService);
  }

  addProductToService(cartDTO: Object) {
    return ApiRequest('POST')
      .Controller('cart')
      .Body(cartDTO)
      .call(this.globalService);
  }

  searchProduct(model: any) {
    return ApiRequest('POST')
      .Controller('product')
      .Action('filter')
      .Body(model)
      .call(this.globalService);
  }
}
