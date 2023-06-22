import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UsersRepository } from '../../repositories/users/users-repository'
import { Either, right } from '@/core/types/either'

type FindManyUsersUseCaseResponse = Either<null, {
  users: User[]
}>

export class FindManyUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(): Promise<FindManyUsersUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return right({
      users,
    })
  }
}
