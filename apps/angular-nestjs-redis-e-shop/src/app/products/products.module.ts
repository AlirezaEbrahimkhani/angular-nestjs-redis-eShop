import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingModule } from './products.routing';
import { ProductsRoutingComponent } from './prodcuts.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const Material_Modules: any[] = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
];

@NgModule({
  declarations: [
    ProductsRoutingComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Material_Modules,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProductsModule {}
