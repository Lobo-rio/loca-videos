import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { MoviesCast } from '@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast'
import { MoviesCastRepository } from '../../repositories/movies-cast/movies-cast-repository'

interface CreateMoviesCastUseCaseRequest {
  filmsId: string
  actorsId: string
  function: string
}

type CreateMovieSCastUseCaseResponse = Either<
  ResourceExistedError,
  {
    moviesCast: MoviesCast
  }
>

export class CreateMoviesCastUseCase {
  constructor(
    private readonly moviesCastRepository: MoviesCastRepository,
  ) {}

  async execute(
    create: CreateMoviesCastUseCaseRequest,
  ): Promise<CreateMovieSCastUseCaseResponse> {
    const moviesCast = MoviesCast.create({
      function: create.function,
      filmsId: create.filmsId,
      actorsId: create.actorsId,
    })

    const moviesCastExisted =
      await this.moviesCastRepository.findByDirector(
        create.actorsId,
        create.filmsId,
      )

    if (moviesCastExisted) return left(new ResourceExistedError())

    await this.moviesCastRepository.create(moviesCast)

    return right({
      moviesCast,
    })
  }
}
