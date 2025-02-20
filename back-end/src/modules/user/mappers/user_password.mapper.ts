import { Mapper } from "src/libs/ddd";
import { UserPasswordEntity } from "../domain/user_password.entity";
import { UserPasswordModel, UserPasswordSchema } from "src/schemas/user_passwords.schema";
import { UserPasswordResponseDto } from "../dtos/user_password.response.dto";

export class UserPasswordMapper
    implements Mapper<UserPasswordEntity, UserPasswordModel, UserPasswordResponseDto> {

    toPersistence(entity: UserPasswordEntity): UserPasswordModel {
        const copy = entity.getProps();

        const record: UserPasswordModel = {
            id: copy.id,
            created_at: copy.created_at,
            updated_at: copy.updated_at,
            password: copy.password,
            user_id: copy.user_id,
        };

        return UserPasswordSchema.parse(record);
    }

    toDomain(record: any): UserPasswordEntity {
        const entity = new UserPasswordEntity({
            id: record.id,
            created_at: new Date(record.created_at),
            updated_at: new Date(record.updated_at),
            props: {
                password: record.password,
                user_id: record.user_id,
            }
        });
        return entity;
    }

    toResponse(entity: UserPasswordEntity): UserPasswordResponseDto {
        const props = entity.getProps();
        const response = new UserPasswordResponseDto(entity);

        return response;
    }
}