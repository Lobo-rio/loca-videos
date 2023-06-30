import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

export interface UpdadeMovieDirectorsUseCaseRequest {
  functionDirectors: string
}

type UpdadeMovieDirectorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeMovieDirectorsUseCase {
  constructor(private readonly movieDirectorsRepository: MovieDirectorsRepository) {}

  async execute(
    id: string,
    movieDirectorsUpdate: UpdadeMovieDirectorsUseCaseRequest,
  ): Promise<UpdadeMovieDirectorsUseCaseResponse> {
    const movieDirectorExisted = await this.movieDirectorsRepository.findById(id)

    if (!movieDirectorExisted) return left(new ResourceNotFoundError())

    await this.movieDirectorsRepository.update(id, movieDirectorsUpdate)

    return right({})
  }
}
