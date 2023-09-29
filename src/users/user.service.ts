import * as bcrypt from 'bcryptjs'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { User } from './models/users.model'
import { ERROR_MESSAGES } from '../constants'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.findByEmail(dto.email)
    if (candidate) {
      throw new BadRequestException(ERROR_MESSAGES.EMAIL_IS_BUSY)
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    return await this.userRepository.create({
      ...dto,
      password: hashPassword
    })
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id)
    if (!user) throw new BadRequestException('Пользователя нет')
    return await this.userRepository.destroy({ where: { id } })
  }

  async getAll(name: string): Promise<User[]> {
    return !name
      ? this.userRepository.findAll({ order: [['id', 'DESC']] })
      : this.userRepository.findAll({
          where: { name },
          order: [['id', 'DESC']]
        })
  }

  async updateUser(newUser: Partial<User>) {
    const user = await this.userRepository.findByPk(newUser.id, {
      attributes: { exclude: ['password'] }
    })
    return user && user.update(newUser)
  }

  async getUserById(id: number): Promise<Partial<User>> {
    return await this.userRepository.findByPk(id)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }
}
