import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { ActorsRepository } from "../../repositories/actors/actors-repository"

export interface UpdadeActorsUseCaseRequest {
  name: string
  sex: string
  birth: Date
  country: string
}

type UpdadeActorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeActorsUseCase {
  constructor(private readonly actorRepository: ActorsRepository) {}

  async execute(
    id: string,
    actorUpdate: UpdadeActorsUseCaseRequest,
  ): Promise<UpdadeActorsUseCaseResponse> {
    const actorExisted = await this.actorRepository.findById(id)

    if (!actorExisted) return left(new ResourceNotFoundError())

    await this.actorRepository.update(id, actorUpdate)

    return right({})
  }
}
