import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DirectorsRepository } from '../../repositories/directors/directors-repository'

type DeleteDirectorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteDirectorsUseCase {
  constructor(private readonly directorRepository: DirectorsRepository) {}

  async execute(id: string): Promise<DeleteDirectorsUseCaseResponse> {
    const director = await this.directorRepository.findById(id)

    if (!director) return left(new ResourceNotFoundError())

    await this.directorRepository.delete(id)

    return right({})
  }
}
