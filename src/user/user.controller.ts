import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from "src/auth/auth.set-metadata";
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiResponseType } from 'src/types/Api';
import User from 'src/entities/user.entity';


@Controller('api/users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res()res: Response<ApiResponseType<Partial<User>>>) {
        try {
        console.log(createUserDto);
            const newUser = await this.userService.createUser(createUserDto);
            console.log(newUser);
            // remove password from response
			const { password, ...rest } = newUser;

            return res.status(HttpStatus.CREATED).json({
                msg: "User created successfully",
				data: rest,
				status: "success",
            });

        } catch (err) {
            throw new BadRequestException({
				status: "error",
				msg: err.message || "An error was encountered while creating company",
			});
        }
    }

    @Public()
    @Get()
    async getAllUsers(@Res() res:Response<ApiResponseType<User[]>>) {
        try {
            const users = await this.userService.getAllUsers();

            return res.status(HttpStatus.OK).json({
              status: "success",
              data: users,
            })
        } catch (err) {
            throw new BadRequestException({
				status: "error",
				msg: err.message,
			});
        }
        
    }
    
    @Post("remove")
	async remove(@Body("id") id: string, @Res() res: Response<ApiResponseType<null>>) {
		try {
			await this.userService.remove(id);

			return res.status(HttpStatus.OK).json({
				msg: "User deleted successfully",
				data: null,
				status: "success",
			});
		} catch (err) {
			console.log(err);
			throw new BadRequestException({
				status: "error",
				msg: "User not found",
			});
		}
	}
}
