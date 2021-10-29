import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../core/models';
import { ApiResponse } from '../../../shared';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'angular-nestjs-redis-e-shop-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any = {};

  constructor(
    private readonly _prodcutService: ProductsService,
    private readonly _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onAddToCart(product: any) {
    const { id, price } = product;
    let user: User = JSON.parse(localStorage.getItem('User') as any);
    this._prodcutService
      .addProductToService({
        cart_uuid: user.products_in_cart,
        product_uuid: id,
        payable_amount: price,
      })
      .subscribe((resp: ApiResponse<any>) => {
        if (resp.Success)
          this._matSnackBar.open('Product added to cart ... !', 'X', {
            duration: 2500,
          });
        else
          this._matSnackBar.open('Somthing went wrong ... !', 'X', {
            duration: 2500,
          });
      });
  }
}
