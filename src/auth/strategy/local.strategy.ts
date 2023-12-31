import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { ERROR_MESSAGES } from 'src/constants'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password)
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_UNAUTHORIZED)
    }
    return user
  }
}
