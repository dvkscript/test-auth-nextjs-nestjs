import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';

@Module({
  providers: [AuthResolver, AuthService, UsersService, UserRepository],
  imports: [PassportModule, UsersModule],
})
export class AuthModule {}
