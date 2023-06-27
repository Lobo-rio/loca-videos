import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'
import { ActorsRepository } from '../../repositories/actors/actors-repository'

type FindByIdActorsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    actor: Actors
  }
>

export class FindByIdActorsUseCase {
  constructor(private readonly actorRepository: ActorsRepository) {}

  async execute(id: string): Promise<FindByIdActorsUseCaseResponse> {
    const actor = await this.actorRepository.findById(id)

    if (!actor) return left(new ResourceNotFoundError())

    return right({ actor })
  }
}
