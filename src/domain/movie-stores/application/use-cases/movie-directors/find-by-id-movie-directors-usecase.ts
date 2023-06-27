import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MovieDirectors } from '@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

type FindByIdMovieDirectorsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    moviedirector: MovieDirectors
  }
>

export class FindByIdMovieDirectorsUseCase {
  constructor(private readonly moviedirectorRepository: MovieDirectorsRepository) {}

  async execute(id: string): Promise<FindByIdMovieDirectorsUseCaseResponse> {
    const moviedirector = await this.moviedirectorRepository.findById(id)

    if (!moviedirector) return left(new ResourceNotFoundError())

    return right({ moviedirector })
  }
}
