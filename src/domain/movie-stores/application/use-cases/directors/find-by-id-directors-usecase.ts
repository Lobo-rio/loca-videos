import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Directors } from '@/domain/movie-stores/enterprise/entities/directors/directors'
import { DirectorsRepository } from '../../repositories/directors/directors-repository'

type FindByIdDirectorsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    director: Directors
  }
>

export class FindByIdDirectorsUseCase {
  constructor(private readonly directorRepository: DirectorsRepository) {}

  async execute(id: string): Promise<FindByIdDirectorsUseCaseResponse> {
    const director = await this.directorRepository.findById(id)

    if (!director) return left(new ResourceNotFoundError())

    return right({ director })
  }
}
