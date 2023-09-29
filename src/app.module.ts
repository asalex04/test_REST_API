import { Module } from '@nestjs/common'
import { UserModule } from './users/user.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env']
    }),
    UserModule,
    AuthModule,
    JwtModule,
    DatabaseModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
