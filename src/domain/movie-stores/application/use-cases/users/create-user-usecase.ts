import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UsersRepository } from '../../repositories/users/users-repository'
import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'

interface CreateUsersUseCaseRequest {
  name: string
  email: string
  admin: boolean
  sector: string
}

type CreateUsersUseCaseResponse = Either<ResourceExistedError, {
  user: User
}>

export class CreateUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    admin,
    sector,
  }: CreateUsersUseCaseRequest): Promise<CreateUsersUseCaseResponse> {
    const user = User.create({
      name,
      email,
      admin,
      sector,
    })

    const userExisted = await this.userRepository.findByEmail(email)

    if (userExisted) return left(new ResourceExistedError())

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
