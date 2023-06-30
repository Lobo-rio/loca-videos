import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { MovieDirectors } from '@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

interface CreateMovieDirectorsUseCaseRequest {
  filmsId: string
  directorsId: string
  function: string
}

type CreateMovieDirectorsUseCaseResponse = Either<
  ResourceExistedError,
  {
    movieDirectors: MovieDirectors
  }
>

export class CreateMovieDirectorsUseCase {
  constructor(
    private readonly movieDirectorsRepository: MovieDirectorsRepository,
  ) {}

  async execute(
    create: CreateMovieDirectorsUseCaseRequest,
  ): Promise<CreateMovieDirectorsUseCaseResponse> {
    const movieDirectors = MovieDirectors.create({
      function: create.function,
      filmsId: create.filmsId,
      directorsId: create.directorsId,
    })

    const movieDirectorsExisted =
      await this.movieDirectorsRepository.findByDirector(
        create.directorsId,
        create.filmsId,
      )

    if (movieDirectorsExisted) return left(new ResourceExistedError())

    await this.movieDirectorsRepository.create(movieDirectors)

    return right({
      movieDirectors,
    })
  }
}
