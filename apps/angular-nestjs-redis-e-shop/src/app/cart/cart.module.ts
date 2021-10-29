import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart.routing';
import { CartRoutingComponent } from './cart-routing.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { CartFooterComponent } from './components/cart-footer/cart-footer.component';

@NgModule({
  declarations: [
    CartRoutingComponent,
    CartMainComponent,
    CartProductCardComponent,
    CartFooterComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
