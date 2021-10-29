import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const ROUTES: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/cart.module').then((m) => m.CartModule),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
  declarations: [NavbarComponent],
})
export class LayoutModule {}
