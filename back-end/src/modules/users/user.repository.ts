import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { hashSync } from "bcryptjs";
import { Repository, RepositoryOptions } from "core/repository";
import { sql } from "slonik";
import { User, UserFields, UserSchema } from "src/schemas/user.schema";
import { RegisterDTO } from "../auth/dto/register.dto";

@Injectable()
export class UserRepository extends Repository {
    private readonly salt = 10;

    protected getModel(): string {
        return "users";
    }

    async createUser(data: RegisterDTO, options?: RepositoryOptions): Promise<User | null> {
        const { password, ...rest } = data;

        const passwordHash = hashSync(password, this.salt);

        const sqlUnsafe = sql.unsafe`
            WITH inserted_user AS (
                INSERT INTO users (${sql.join(Object.keys(rest).map(value => sql.identifier([value])), sql.fragment`, `)})
                VALUES (${sql.join(Object.values(rest).map(value => sql.literalValue(value)), sql.fragment`, `)})
                RETURNING *
            )
            INSERT INTO user_passwords (user_id, password)
            VALUES ((SELECT id FROM inserted_user), ${sql.literalValue(passwordHash)})
            RETURNING ${sql.join(UserFields.map(value => sql.unsafe`(SELECT ${sql.identifier([value])} FROM inserted_user)`), sql.fragment`, `)};
        `;

        let res: User | null = null;

        try {
            if (options?.transaction) {
                res = await options.transaction.maybeOne(sqlUnsafe);
            } else {
                res = await this.db.maybeOne(sqlUnsafe);
            }
            return res;
        } catch (error) {
            throw new BadRequestException(
                {
                    message: error.message,
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR
                },
                {
                    description: "test",
                    cause: new Error("error")
                }
            )
        }
    }
    getUserWithPassword() {
        const fields = Object.keys(UserSchema.shape);
        const data = sql.unsafe`
            ${this.SELECT(this.model, this.ATTRIBUTES(fields), this.ATTRIBUTES(["password"], "user_passwords"))}
        `
    }
}