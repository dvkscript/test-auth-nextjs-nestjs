import { Password } from "./value-objects/password.value-object";

export type AuthProps = {
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    password?: Password;
}

export type RegisterProps = {
    first_name: string;
    last_name: string;
    email: string;
    password: Password;
}