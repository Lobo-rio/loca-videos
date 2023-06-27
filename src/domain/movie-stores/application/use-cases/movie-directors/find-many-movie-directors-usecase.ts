import { Either, right } from '@/core/types/either'
import { MovieDirectors } from '@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

type FindManyMovieDirectorsUseCaseResponse = Either<
  null,
  {
    moviedirectors: MovieDirectors[]
  }
>

export class FindManyMovieDirectorsUseCase {
  constructor(private readonly moviedirectorRepository: MovieDirectorsRepository) {}

  async execute(): Promise<FindManyMovieDirectorsUseCaseResponse> {
    const moviedirectors = await this.moviedirectorRepository.findMany()

    return right({
      moviedirectors,
    })
  }
}
