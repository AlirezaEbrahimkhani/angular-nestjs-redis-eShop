import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { AuthController } from './controllers';
import { AuthService } from './services';


@Module({
  imports: [CoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
