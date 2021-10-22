import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CoreModule, ProductModule , CustomerModule],
})
export class AppModule {}
