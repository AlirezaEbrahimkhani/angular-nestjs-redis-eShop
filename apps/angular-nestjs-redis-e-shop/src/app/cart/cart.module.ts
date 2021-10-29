import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart.routing';
import { CartRoutingComponent } from './cart-routing.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { CartFooterComponent } from './components/cart-footer/cart-footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const Material_Module: any[] = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [
    CartRoutingComponent,
    CartMainComponent,
    CartProductCardComponent,
    CartFooterComponent,
  ],
  imports: [CommonModule, CartRoutingModule, Material_Module, SharedModule],
})
export class CartModule {}
