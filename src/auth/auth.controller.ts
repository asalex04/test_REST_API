import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { BaseUserDto } from '../users/dto/base-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201 })
  @Post('/register')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto)
  }

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({ status: 200 })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userDto: BaseUserDto) {
    return await this.authService.login(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Логаут' })
  @ApiResponse({ status: 200 })
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('connect.sid')
  }
}
