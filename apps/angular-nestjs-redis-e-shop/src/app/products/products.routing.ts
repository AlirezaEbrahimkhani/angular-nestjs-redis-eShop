import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingComponent } from './prodcuts.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProductsRoutingComponent,
    children: [
      {
        path: 'product-list',
        component: ProductListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
