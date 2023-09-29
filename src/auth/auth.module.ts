import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' }
    }),
    PassportModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
