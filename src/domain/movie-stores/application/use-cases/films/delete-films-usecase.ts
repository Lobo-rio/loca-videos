import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { FilmsRepository } from '../../repositories/films/films-repository'

type DeleteFilmsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteFilmsUseCase {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async execute(id: string): Promise<DeleteFilmsUseCaseResponse> {
    const film = await this.filmRepository.findById(id)

    if (!film) return left(new ResourceNotFoundError())

    await this.filmRepository.delete(film.id.toString())

    return right({})
  }
}
