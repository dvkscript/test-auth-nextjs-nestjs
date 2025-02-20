import { ApiProperty } from "@nestjs/swagger";
import { ResponseBase } from "src/libs/api/response.base";

export class UserResponseDto extends ResponseBase {
    @ApiProperty({
        example: 'First',
        description: "User's first name",
    })
    first_name: string;

    @ApiProperty({
        example: "Last",
        description: 'User last name',
    })
    last_name: string;

    @ApiProperty({
        example: "Display name",
        description: 'User display name',
    })
    display_name: string;

    @ApiProperty({
        example: 'joh-doe@gmail.com',
        description: "User's email address",
    })
    email: string;
}
