import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Films } from '@/domain/movie-stores/enterprise/entities/films/films'
import { FilmsRepository } from '../../repositories/films/films-repository'

type FindByIdFilmsUseCaseResponse = Either<ResourceNotFoundError, {
  film: Films
}>

export class FindByIdFilmsUseCase {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async execute(id: string): Promise<FindByIdFilmsUseCaseResponse> {
    const film = await this.filmRepository.findById(id)

    if (!film) return left(new ResourceNotFoundError())

    return right({ film })
  }
}
