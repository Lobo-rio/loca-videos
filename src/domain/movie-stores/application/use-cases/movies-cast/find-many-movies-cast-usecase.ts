import { Either, right } from '@/core/types/either'
import { MoviesCast } from '@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast'
import { MoviesCastRepository } from '../../repositories/movies-cast/movies-cast-repository'

type FindManyMoviesCastUseCaseResponse = Either<
  null,
  {
    moviesCast: MoviesCast[]
  }
>

export class FindManyMoviesCastUseCase {
  constructor(private readonly moviesCastRepository: MoviesCastRepository) {}

  async execute(): Promise<FindManyMoviesCastUseCaseResponse> {
    const moviesCast= await this.moviesCastRepository.findMany()

    return right({
      moviesCast,
    })
  }
}
