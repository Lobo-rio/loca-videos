import { User } from '../../entities/users/users'
import { UsersRepository } from '../../repositories/users/users-repository'

interface CreateUsersUseCaseRequest {
  name: string
  email: string
  admin: boolean
  sector: string
}

export class CreateUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({ name, email, admin, sector }: CreateUsersUseCaseRequest) {
    const user = User.create({
      name,
      email,
      admin,
      sector,
    })

    await this.userRepository.create(user)

    return user
  }
}
