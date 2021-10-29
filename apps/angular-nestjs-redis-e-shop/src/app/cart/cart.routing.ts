import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartRoutingComponent } from './cart-routing.component';
import { CartMainComponent } from './components/cart-main/cart-main.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CartRoutingComponent,
    children: [
      {
        path: 'main',
        component: CartMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
