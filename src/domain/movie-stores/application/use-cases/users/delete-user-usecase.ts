import { Either, left, right } from '@/core/types/either'
import { UsersRepository } from '../../repositories/users/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type DeleteUsersUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUsersUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) return left(new ResourceNotFoundError())

    await this.userRepository.delete(user.id.toString())

    return right({})
  }
}
