import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/schemas/user.schema';
import { UserPassword } from 'src/schemas/user_passwords.schema';
import { UserRepository } from '../users/user.repository';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ){}
  async createUser(data: RegisterDTO): Promise<User | null> {
    return this.userRepository.createUser(data);
  }

  async validateUser(username: string, password: string) {
    return true;
  }
}
