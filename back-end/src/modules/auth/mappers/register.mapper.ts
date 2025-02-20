import { Mapper } from "src/libs/ddd";
import { AuthEntity } from "../domain/auth.entity";
import { UserModel, UserSchema } from "src/schemas/user.schema";
import { UserPasswordModel, UserPasswordSchema } from "src/schemas/user_passwords.schema";
import { RegisterResponseDto } from "../dtos/register.response.dto";

export class RegisterMapper
    implements Mapper<AuthEntity, UserModel, RegisterResponseDto> {

    toPersistence(entity: AuthEntity): UserModel & UserPasswordModel {
        const copy = entity.getProps();

        const record = {
            id: copy.id,
            created_at: copy.created_at,
            updated_at: copy.updated_at,
            email: copy.email,
            first_name: copy.first_name,
            last_name: copy.last_name,
            is_active: copy.is_active,
            password: copy.password,
            user_id: copy.id,
        };

        const userWithUserPasswordSchema = UserSchema.merge(UserPasswordSchema);
        return userWithUserPasswordSchema.parse(record);
    }
    toDomain(record: UserModel): AuthEntity {
        const entity = new AuthEntity({
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

    toResponse(entity: AuthEntity): RegisterResponseDto {
        const props = entity.getProps();
        const response = new RegisterResponseDto(entity);
        response.email = props.email;
        response.first_name = props.first_name;
        response.last_name = props.last_name;
        response.display_name = `${props.first_name} ${props.last_name}`;

        return response;
    }
}