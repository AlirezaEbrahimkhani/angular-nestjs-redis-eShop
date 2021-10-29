import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../shared';
import { Filter } from '../../shared/interfaces/filter.interfaces';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'angular-nestjs-redis-e-shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: any = {};

  constructor(private readonly productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducst();
  }

  getProducst() {
    this.productService.getAllProducts().subscribe((resp: ApiResponse<any>) => {
      this.productList = resp.Data;
    });
  }

  onFormChanged($event: Filter) {
    this.productService
      .searchProduct($event)
      .subscribe((resp: ApiResponse<any>) => {
        this.productList = resp.Data;
      });
  }
}
