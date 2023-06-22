import { UsersRepository } from '../../repositories/users/users-repository'

interface DeleteUsersUseCaseResponse {}

export class DeleteUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUsersUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new Error('User not found!')

    await this.userRepository.delete(user.id.toString())

    return {}
  }
}
