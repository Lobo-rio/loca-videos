import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UpdadeUsersUseCaseRequest } from '../../use-cases/users/update-user-usercase'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findMany(): Promise<User[]>
  create(user: User): Promise<void>
  update(id: string, data: UpdadeUsersUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
