import {IsEmail, IsString, IsEnum } from 'class-validator'
import { SystemRole } from 'src/entities/user.entity';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

	@IsEnum(SystemRole)
	systemRole?: SystemRole;
}