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
import { InformationRendererComponent } from './components/information-renderer/information-renderer.component';

const Material_Modules: any[] = [MatCardModule, MatButtonModule, MatIconModule];

@NgModule({
  declarations: [
    ProductsRoutingComponent,
    ProductListComponent,
    ProductCardComponent,
    InformationRendererComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Material_Modules,
    SharedModule,
  ],
})
export class ProductsModule {}
