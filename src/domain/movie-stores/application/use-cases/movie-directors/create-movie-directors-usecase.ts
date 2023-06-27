import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { MovieDirectors } from '@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

interface CreateUseCaseRequest {
  filmsId: string
  directorsId: string
  function: string
}

type CreateMovieDirectorsUseCaseResponse = Either<
  ResourceExistedError,
  {
    moviedirector: MovieDirectors
  }
>

export class CreateMovieDirectorsUseCase {
  constructor(
    private readonly moviedirectorRepository: MovieDirectorsRepository,
  ) {}

  async execute(
    create: CreateUseCaseRequest,
  ): Promise<CreateMovieDirectorsUseCaseResponse> {
    const moviedirector = MovieDirectors.create({
      function: create.function,
      filmsId: create.filmsId,
      directorsId: create.directorsId,
    })

    const moviedirectorExisted =
      await this.moviedirectorRepository.findByDirector(
        create.directorsId,
        create.filmsId,
      )

    if (moviedirectorExisted) return left(new ResourceExistedError())

    await this.moviedirectorRepository.create(moviedirector)

    return right({
      moviedirector,
    })
  }
}
