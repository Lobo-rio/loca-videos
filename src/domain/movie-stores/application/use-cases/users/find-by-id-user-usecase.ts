import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UsersRepository } from '../../repositories/users/users-repository'

interface FindByIdUsersUseCaseResponse {
  user: User
}

export class FindByIdUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(id: string): Promise<FindByIdUsersUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new Error('User not found!')

    return {
      user,
    }
  }
}
