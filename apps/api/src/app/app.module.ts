import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

import { CoreModule } from './core/core.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CoreModule, ProductModule, CustomerModule, AuthModule, CartModule],
})
export class AppModule {}
