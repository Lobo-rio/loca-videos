import { User } from "@/domain/movie-stores/enterprise/entities/users/users"
import { UsersRepository } from "../../repositories/users/users-repository"

interface FindManyUsersUseCaseResponse {
  users: User[]
}

export class FindManyUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(): Promise<FindManyUsersUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return {
      users
    }
  }
}
