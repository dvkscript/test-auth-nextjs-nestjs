import { ApiProperty } from "@nestjs/swagger";
import { ResponseBase } from "src/libs/api/response.base";

export class UserPasswordResponseDto extends ResponseBase {
    @ApiProperty({
        example: 'Id',
        description: "User's password id",
    })
    id: string;

    @ApiProperty({
        example: "Password",
        description: 'User password',
    })
    password: string;
}
