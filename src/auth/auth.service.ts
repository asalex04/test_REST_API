import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { ERROR_MESSAGES } from 'src/constants'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UserService } from 'src/users/user.service'
import { BaseUserDto } from '../users/dto/base-user.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/models/users.model'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async registration(dto: CreateUserDto): Promise<Partial<User>> {
    const candidate = await this.userService.findByEmail(dto.email)
    if (candidate) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_IS_BUSY)
    }
    const newUser = await this.userService.createUser(dto)
    return newUser
  }

  async validateUser(email: string, password: string): Promise<any> {
    if (!password || !email) {
      throw new BadRequestException({
        message: ERROR_MESSAGES.NOT_EMPTY
      })
    }
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new BadRequestException({
        message: ERROR_MESSAGES.NO_USER_EMAIL_EXISTS
      })
    }
    const passwordEquals = await bcrypt.compare(password, user.password)
    if (passwordEquals) {
      const { password, ...result } = user
      return result
    }
    throw new UnauthorizedException(ERROR_MESSAGES.NO_USER_EXISTS)
  }

  async login(user: BaseUserDto) {
    const payload = { email: user.email, password: user.password }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
