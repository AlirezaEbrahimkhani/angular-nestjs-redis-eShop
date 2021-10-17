import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CoreModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
