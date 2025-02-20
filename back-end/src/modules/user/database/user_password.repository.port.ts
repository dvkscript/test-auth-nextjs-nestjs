import { RepositoryPort } from "src/libs/ddd";
import { UserPasswordEntity } from "../domain/user_password.entity";

export interface UserPasswordRepositoryPort extends RepositoryPort<UserPasswordEntity> {
}
