import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ProductController } from './controllers';
import { ProductService } from './services';

@Module({
  imports: [CoreModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
