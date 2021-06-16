import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Authentication} from './users/entities/authentication';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('Authentication')
  @ApiResponse({
    status: 201,
    description: 'Login successfully',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() authentication: Authentication): any {
    console.log(req.user);
    console.log(authentication);
    return this.authService.login(req.user);
  }
}
