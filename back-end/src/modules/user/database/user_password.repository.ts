import { SqlRepositoryBase } from "src/libs/db/sql-repository.base";
import { UserPasswordEntity } from "../domain/user_password.entity";
import { UserPasswordModel, UserPasswordSchema } from "src/schemas/user_passwords.schema";
import { UserPasswordRepositoryPort } from "./user_password.repository.port";
import { InjectPool } from "nestjs-slonik";
import { DatabasePool } from "slonik";
import { UserPasswordMapper } from "../mappers/user_password.mapper";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Logger } from "@nestjs/common";

export class UserPasswordRepository
    extends SqlRepositoryBase<UserPasswordEntity, UserPasswordModel>
    implements UserPasswordRepositoryPort {

    protected tableName = "user_passwords";

    protected schema = UserPasswordSchema;

    constructor(
        @InjectPool()
        pool: DatabasePool,
        mapper: UserPasswordMapper,
        eventEmitter: EventEmitter2,
    ) {
        super(pool, mapper, eventEmitter, new Logger(UserPasswordRepository.name));
    }
    
}