import { Mapper } from "src/libs/ddd";
import { UserEntity } from "../domain/user.entity";
import { UserModel, UserSchema } from "src/schemas/user.schema";
import { UserResponseDto } from "../dtos/user.response.dto";

export class UserMapper
    implements Mapper<UserEntity, UserModel, UserResponseDto> {
    toPersistence(entity: UserEntity): UserModel {
        const copy = entity.getProps();

        const record: UserModel = {
            id: copy.id,
            created_at: copy.created_at,
            updated_at: copy.updated_at,
            email: copy.email,
            first_name: copy.first_name,
            last_name: copy.last_name,
            is_active: copy.is_active || false,
        };

        return UserSchema.parse(record);
    }

    toDomain(record: any): UserEntity {
        const entity = new UserEntity({
            id: record.id,
            created_at: new Date(record.created_at),
            updated_at: new Date(record.updated_at),
            props: {
                email: record.email,
                first_name: record.first_name,
                last_name: record.last_name,
                is_active: record.is_active,
            }
        });
        return entity;
    }

    toResponse(entity: UserEntity): UserResponseDto {
        const props = entity.getProps();
        const response = new UserResponseDto(entity);

        return response;
    }
}