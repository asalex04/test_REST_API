import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { User } from './models/users.model'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ summary: 'Все пользователи' })
  @ApiResponse({ status: 200, type: User })
  @ApiQuery({ name: 'name', required: false })
  @Get('/')
  getAllUser(@Query('name') name: string) {
    return this.usersService.getAll(name)
  }

  @ApiOperation({ summary: 'Профиль пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  @ApiParam({ name: 'id' })
  getUser(@Param('id') id: number) {
    return this.usersService.getUserById(id)
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('/create')
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user)
  }

  @ApiOperation({ summary: 'Изменение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/update')
  update(@Body() user: CreateUserDto) {
    return this.usersService.updateUser(user)
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200 })
  @Delete('/delete')
  delete(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUser(dto.id)
  }
}
