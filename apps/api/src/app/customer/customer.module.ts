import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { CustomerController } from './controllers';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [CoreModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
