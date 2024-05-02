import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
         private jwtService: JwtService
    ){}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if(user) {
            let userPassword = user.password;

            const isVerified = await argon2.verify(userPassword, pass);

            if(isVerified) {
                const {password, ...result} = user;
                return result;
            }
            return null;
        }
        return null;
    }

    async login (user: any) {
        // remove password from response and use it to generate token
        const {password, id, token, ...rest} = user ;
       
        const newPayload = {
            sub: user.id,
        };

        // merge rest of user data with payload
        const payload = {...newPayload, ...rest};

        const accessToken = this.jwtService.sign(payload);

        return {
            status: "success",
            msg: "User logged in successfully ",
            data: {
                accessToken,
                userData: user,
            }
        }
    }
}
