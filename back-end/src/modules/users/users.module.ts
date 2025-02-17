import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './user.repository';

@Module({
  providers: [
    UsersResolver, 
    UsersService,
    UserRepository,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule { }
