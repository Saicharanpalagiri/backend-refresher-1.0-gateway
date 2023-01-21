import { Controller, Get, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('statement-4');
    let { user } = req;
    console.log({ user });
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Request() req) {
    console.log(req.body);
    return this.userService.signup(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Request() req) {
    return this.userService.deleteUser(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  FindAlll(@Request() req) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getContent')
  FindAlllContent(@Request() req) {
    return this.userService.findAllContent();
  }
}
