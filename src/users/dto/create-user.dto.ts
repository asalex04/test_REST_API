import { ApiProperty } from '@nestjs/swagger'
import { BaseUserDto } from './base-user.dto'

export class CreateUserDto extends BaseUserDto {
  @ApiProperty()
  readonly name: string
}
