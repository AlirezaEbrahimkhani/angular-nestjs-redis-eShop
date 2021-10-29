import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../../core/models';
import { ApiResponse } from '../../../shared';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss'],
})
export class CartFooterComponent {
  @Input() cartInformation: any = {};

  constructor(
    private readonly _cartService: CartService,
    private readonly _snakBar: MatSnackBar,
    private readonly router: Router
  ) {}

  payCart() {
    let user: User = JSON.parse(localStorage.getItem('User') as any);
    this._cartService
      .cartPayment(user.products_in_cart)
      .subscribe((resp: ApiResponse<any>) => {
        if (resp.Success) {
          this._snakBar.open('Cart paied successfully ... !', 'X', {
            duration: 2000,
          });
          this.router.navigate(['/home']);
        } else
          this._snakBar.open('Something went wrong ... !', 'X', {
            duration: 2000,
          });
      });
  }
}
