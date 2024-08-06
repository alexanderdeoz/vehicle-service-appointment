import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from '@v1/modules/users/controllers';
import { Repositories } from '@v1/modules/users/providers/repositories';
import { GetUserById } from '@v1/modules/users/pipes';

@Global()
@Module({
  controllers: [UsersController],
  providers: [...Repositories, UsersService, GetUserById],
  exports: [...Repositories, UsersService, GetUserById],
})
export class UsersModule {}
