import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DirectorsRepository } from '../../repositories/directors/directors-repository'

export interface UpdadeMovieDirectorsUseCaseRequest {
  execute(arg0: string, arg1: { functionDirectors: string }): unknown
  functionDirectors: string
}

type UpdadeMovieDirectorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeMovieDirectorsUseCase {
  constructor(private readonly movieDirectorsRepository: DirectorsRepository) {}

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
