import { User } from "@/domain/movie-stores/enterprise/entities/users/users"

export interface UsersRepository {
  findById(id: string): Promise<User>
  findMany(id: string): Promise<User[]>
  create(user: User): Promise<void>
  update(id: string, user: User): Promise<void>
  delete(id: string): Promise<void>
}
