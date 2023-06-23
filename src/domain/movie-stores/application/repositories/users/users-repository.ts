import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UpdadeUsersUseCaseRequest } from '../../use-cases/users/update-user-usercase'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findMany(): Promise<User[]>
  create(user: User): Promise<User>
  update(id: string, data: UpdadeUsersUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
