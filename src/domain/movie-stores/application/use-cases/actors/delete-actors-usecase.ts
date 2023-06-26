import { Either, left, right } from '@/core/types/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ActorsRepository } from '../../repositories/actors/actors-repository'

type DeleteActorsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteActorsUseCase {
  constructor(private readonly actorRepository: ActorsRepository) {}

  async execute(id: string): Promise<DeleteActorsUseCaseResponse> {
    const actor = await this.actorRepository.findById(id)

    if (!actor) return left(new ResourceNotFoundError())

    await this.actorRepository.delete(id)

    return right({})
  }
}
