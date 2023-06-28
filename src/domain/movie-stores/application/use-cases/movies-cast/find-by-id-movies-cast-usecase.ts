import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MoviesCast } from '@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast'
import { MoviesCastRepository } from '../../repositories/movies-cast/movies-cast-repository'

type FindByIdMoviesCastUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    moviesCast: MoviesCast
  }
>

export class FindByIdMoviesCastUseCase {
  constructor(private readonly moviesCastRepository: MoviesCastRepository) {}

  async execute(id: string): Promise<FindByIdMoviesCastUseCaseResponse> {
    const moviesCast = await this.moviesCastRepository.findById(id)

    if (!moviesCast) return left(new ResourceNotFoundError())

    return right({ moviesCast })
  }
}
