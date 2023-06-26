import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'
import { ActorsRepository } from '../../repositories/actors/actors-repository'

export interface CreateActorsUseCaseRequest {
    name: string
    sex: string
    birth: Date
    country: string
}

type CreateActorsUseCaseResponse = Either<ResourceExistedError, {
  actor: Actors
}>

export class CreateActorsUseCase {
  constructor(private readonly actorRepository: ActorsRepository) {}

  async execute({
    name,
    sex,
    birth,
    country,
  }: CreateActorsUseCaseRequest): Promise<CreateActorsUseCaseResponse> {
    const actor = Actors.create({
        name,
        sex,
        birth,
        country,
    })

    const actorExisted = await this.actorRepository.findByName(name)

    if (actorExisted) return left(new ResourceExistedError())

    await this.actorRepository.create(actor)

    return right({
      actor,
    })
  }
}
