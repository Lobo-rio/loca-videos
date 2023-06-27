import { Either, right } from '@/core/types/either'
import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'
import { ActorsRepository } from '../../repositories/actors/actors-repository'

type FindManyActorsUseCaseResponse = Either<
  null,
  {
    actors: Actors[]
  }
>

export class FindManyActorsUseCase {
  constructor(private readonly actorRepository: ActorsRepository) {}

  async execute(): Promise<FindManyActorsUseCaseResponse> {
    const actors = await this.actorRepository.findMany()

    return right({
      actors,
    })
  }
}
