import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MovieDirectorsRepository } from '../../repositories/movie-directors/movie-directors-repository'

type DeleteMovieDirectorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteMovieDirectorsUseCase {
  constructor(private readonly movieDirectorRepository: MovieDirectorsRepository) {}

  async execute(id: string): Promise<DeleteMovieDirectorsUseCaseResponse> {
    const movieDirector = await this.movieDirectorRepository.findById(id)

    if (!movieDirector) return left(new ResourceNotFoundError())

    await this.movieDirectorRepository.delete(id)

    return right({})
  }
}
