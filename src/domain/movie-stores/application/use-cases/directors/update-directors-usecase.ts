import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { DirectorsRepository } from "../../repositories/directors/directors-repository"

export interface UpdadeDirectorsUseCaseRequest {
  name: string
  sex: string
  birth: Date
  country: string
}

type UpdadeDirectorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeDirectorsUseCase {
  constructor(private readonly directorRepository: DirectorsRepository) {}

  async execute(
    id: string,
    directorUpdate: UpdadeDirectorsUseCaseRequest,
  ): Promise<UpdadeDirectorsUseCaseResponse> {
    const directorExisted = await this.directorRepository.findById(id)

    if (!directorExisted) return left(new ResourceNotFoundError())

    await this.directorRepository.update(id, directorUpdate)

    return right({})
  }
}
