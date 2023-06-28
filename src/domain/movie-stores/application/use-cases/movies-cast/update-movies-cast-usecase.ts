import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MoviesCastRepository } from '../../repositories/movies-cast/movies-cast-repository'

export interface UpdadeMoviesCastUseCaseRequest {
  functionActors: string
}

type UpdadeMoviesCastUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeMoviesCastUseCase {
  constructor(private readonly moviesCastRepository: MoviesCastRepository) {}

  async execute(
    id: string,
    moviesCastUpdate: UpdadeMoviesCastUseCaseRequest,
  ): Promise<UpdadeMoviesCastUseCaseResponse> {
    const moviesCastExisted = await this.moviesCastRepository.findById(id)

    if (!moviesCastExisted) return left(new ResourceNotFoundError())

    await this.moviesCastRepository.update(id, moviesCastUpdate)

    return right({})
  }
}
