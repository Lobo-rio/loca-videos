import { User } from '../../entities/users/users'

export interface UsersRepository {
  create(user: User): Promise<void>
}
