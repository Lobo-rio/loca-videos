import { Either, left, right } from '@/core/types/either'
import { FilmsRepository } from '../../repositories/films/films-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface UpdadeFilmsUseCaseRequest {
  description: string
  launch: Date
  boxOffice: number
  indications: string
  basedOn: string
}

type UpdadeFilmsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class UpdadeFilmsUseCase {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async execute(
    id: string,
    filmUpdate: UpdadeFilmsUseCaseRequest,
  ): Promise<UpdadeFilmsUseCaseResponse> {
    const filmExisted = await this.filmRepository.findById(id)

    if (!filmExisted) return left(new ResourceNotFoundError())

    await this.filmRepository.update(id, filmUpdate)

    return right({})
  }
}
