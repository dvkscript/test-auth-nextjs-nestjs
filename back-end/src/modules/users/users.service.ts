import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/schemas/user.schema';
import { RepositoryOptions } from 'core/repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  findOne(email: string, options?: RepositoryOptions) {
    return this.userRepository.findOne<Partial<User>>({
      email,
    }, options)
  }
}
