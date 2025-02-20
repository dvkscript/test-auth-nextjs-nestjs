
export type UserProps = CreateUserProps 

export type CreateUserProps = {
    first_name: string;
    last_name: string;
    email: string;
    is_active?: boolean;
}

export type UserPasswordProps = CreateUserPasswordProps

export type CreateUserPasswordProps = {
    password: string;
    user_id: string;
}