import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { CartController } from './controllers';
import { CartService } from './services';

@Module({
  imports: [CoreModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
