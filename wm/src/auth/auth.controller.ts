import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service : AuthService){
    }
    //@UseGuards(AuthGuard('jwt'))
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
      return this.service.login(request.user);
    }

    @Post('login2')
    async test(@Request() request) {
      return console.log("hello");
    }
}