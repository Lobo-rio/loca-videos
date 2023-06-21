import { User } from "@/domain/movie-stores/enterprise/entities/users/users"
import { UsersRepository } from "../../repositories/users/users-repository"

export interface UpdadeUsersUseCaseRequest {
    name?: string,
    admin?: boolean,
    sector?: string,
}

interface UpdadeUsersUseCaseResponse {}

export class UpdadeUsersUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(
    id: string,
    data: UpdadeUsersUseCaseRequest
  ): Promise<UpdadeUsersUseCaseResponse> {
    await this.userRepository.update(
        id,
        data,
    )

    return {}
  }
}
