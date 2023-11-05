import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthDto {
	@ApiProperty({
		example: "Jourloy",
		description: "Username",
	})
	@IsString()
	username: string;

	@ApiProperty({
		example: "112233",
		description: "User password",
	})
	@IsString()
	password: string;
}
