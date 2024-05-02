import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.set-metadata';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
