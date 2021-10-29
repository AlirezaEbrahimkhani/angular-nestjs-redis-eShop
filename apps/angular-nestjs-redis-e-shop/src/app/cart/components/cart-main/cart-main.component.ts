import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models';
import { ApiResponse } from '../../../shared';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss'],
})
export class CartMainComponent implements OnInit {
  cartProdcuts: any[] = [];
  cartInformation: any = {};
  constructor(private readonly _cartService: CartService) {}

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem('User') as any);
    this._cartService
      .getCartProuct(user.products_in_cart)
      .subscribe((resp: ApiResponse<any>) => {
        this.cartProdcuts = resp.Data.products;
        this.cartInformation = resp.Data.cart;
      });
  }
}
