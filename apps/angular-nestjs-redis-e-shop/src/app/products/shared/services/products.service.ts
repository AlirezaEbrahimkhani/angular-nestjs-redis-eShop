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
}
