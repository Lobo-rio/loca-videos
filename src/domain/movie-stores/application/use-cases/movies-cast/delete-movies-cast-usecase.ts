import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MoviesCastRepository } from '../../repositories/movies-cast/movies-cast-repository'

type DeleteMoviesCastUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteMoviesCastUseCase {
  constructor(private readonly moviesCastRepository: MoviesCastRepository) {}

  async execute(id: string): Promise<DeleteMoviesCastUseCaseResponse> {
    const actor = await this.moviesCastRepository.findById(id)

    if (!actor) return left(new ResourceNotFoundError())

    await this.moviesCastRepository.delete(id)

    return right({})
  }
}
