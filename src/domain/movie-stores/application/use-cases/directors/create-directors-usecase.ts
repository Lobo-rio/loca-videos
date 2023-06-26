import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { Directors } from '@/domain/movie-stores/enterprise/entities/directors/directors'
import { DirectorsRepository } from '../../repositories/directors/directors-repository'

export interface CreateDirectorsUseCaseRequest {
    name: string
    sex: string
    birth: Date
    country: string
}

type CreateDirectorsUseCaseResponse = Either<ResourceExistedError, {
  director: Directors
}>

export class CreateDirectorsUseCase {
  constructor(private readonly directorRepository: DirectorsRepository) {}

  async execute({
    name,
    sex,
    birth,
    country,
  }: CreateDirectorsUseCaseRequest): Promise<CreateDirectorsUseCaseResponse> {
    const director = Directors.create({
        name,
        sex,
        birth,
        country,
    })

    const directorExisted = await this.directorRepository.findByName(name)

    if (directorExisted) return left(new ResourceExistedError())

    await this.directorRepository.create(director)

    return right({
      director,
    })
  }
}
