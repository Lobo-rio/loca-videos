import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UsersRepository } from '../../repositories/users/users-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type FindByIdUsersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class FindByIdUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(id: string): Promise<FindByIdUsersUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) return left(new ResourceNotFoundError())

    return right({ user })
  }
}
