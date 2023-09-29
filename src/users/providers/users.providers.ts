import { User } from '../models/users.model'

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User
  }
]
