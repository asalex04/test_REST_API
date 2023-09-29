import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../../users/user.service'
import { User } from '../../users/models/users.model'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'secret'
    })
  }

  async validate(payload: any): Promise<User> {
    console.log(payload)
    const user = await this.userService.findByEmail(payload.email)
    console.log(user)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
