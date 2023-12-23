import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [forwardRef(() => AuthenticationModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
