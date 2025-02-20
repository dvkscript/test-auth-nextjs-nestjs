import { Injectable, Logger } from "@nestjs/common";
import { SqlRepositoryBase } from "src/libs/db/sql-repository.base";
import { UserModel, UserSchema } from "src/schemas/user.schema";
import { UserPasswordModel } from "src/schemas/user_passwords.schema";
import { AuthEntity } from "../domain/auth.entity";
import { AuthRepositoryPort } from "./auth.repository.port";
import { InjectPool } from "nestjs-slonik";
import { DatabasePool, sql } from "slonik";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { RegisterMapper } from "../mappers/register.mapper";

@Injectable()
export class AuthRepository
    extends SqlRepositoryBase<AuthEntity, UserModel & UserPasswordModel>
    implements AuthRepositoryPort {
    protected tableName = 'users';

    protected schema = UserSchema;

    constructor(
        @InjectPool()
        pool: DatabasePool,
        mapper: RegisterMapper,
        eventEmitter: EventEmitter2,
    ) {
        super(pool, mapper, eventEmitter, new Logger(AuthRepository.name));
    }

    async findOneByEmail(email: string): Promise<AuthEntity> {
        const user = await this.pool.one(
            sql.type(UserSchema)`SELECT * FROM ${sql.identifier([this.tableName])} WHERE email = ${email}`,
        );

        return this.mapper.toDomain(user);
    }
    test(value: any) {
        console.log(value);
        
    }
}