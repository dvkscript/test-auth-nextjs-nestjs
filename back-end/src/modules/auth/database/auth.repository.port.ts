import { PaginatedQueryParams, RepositoryPort } from 'src/libs/ddd';
import { AuthEntity } from '../domain/auth.entity';

export interface FindUserParams extends PaginatedQueryParams {
  readonly email?: string;
}

export interface AuthRepositoryPort extends RepositoryPort<AuthEntity> {
  findOneByEmail(email: string): Promise<AuthEntity | null>;
}
