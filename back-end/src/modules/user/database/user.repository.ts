import { SqlRepositoryBase } from "src/libs/db/sql-repository.base";
import { UserModel, UserSchema } from "src/schemas/user.schema";
import { UserEntity } from "../domain/user.entity";
import { UserRepositoryPort } from "./user.repository.port";
import { InjectPool } from "nestjs-slonik";
import { DatabasePool, sql } from "slonik";
import { Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepository
    extends SqlRepositoryBase<UserEntity, UserModel>
    implements UserRepositoryPort {
    protected tableName = 'users';

    protected schema = UserSchema;

    constructor(
        @InjectPool()
        pool: DatabasePool,
        mapper: UserMapper,
        eventEmitter: EventEmitter2,
    ) {
        super(pool, mapper, eventEmitter, new Logger(UserRepository.name));
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.pool.maybeOne(
            sql.type(UserSchema)`SELECT * FROM ${sql.identifier([this.tableName])} WHERE email = ${email}`,
        );

        return this.mapper.toDomain(user);
    }
}

