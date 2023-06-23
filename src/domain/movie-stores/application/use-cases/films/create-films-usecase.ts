import { Either, left, right } from '@/core/types/either'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { Films } from '@/domain/movie-stores/enterprise/entities/films/films'
import { FilmsRepository } from '../../repositories/films/films-repository'
import { Slug } from '@/domain/movie-stores/enterprise/entities/value-objects/slug'

interface CreateFilmsUseCaseRequest {
    title: string
    slug: Slug
    description: string
    launch: Date
    boxOffice: number
    indications: string
    basedOn: string
}

type CreateFilmsUseCaseResponse = Either<ResourceExistedError, {
  film: Films
}>

export class CreateFilmsUseCase {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async execute({
    title,
    slug,
    description,
    launch,
    boxOffice,
    indications,
    basedOn,
  }: CreateFilmsUseCaseRequest): Promise<CreateFilmsUseCaseResponse> {
    const film = Films.create({
        title,
        slug,
        description,
        launch,
        boxOffice,
        indications,
        basedOn,
    })

    const filmExisted = await this.filmRepository.findByTitle(title)

    if (filmExisted) return left(new ResourceExistedError())

    await this.filmRepository.create(film)

    return right({
      film,
    })
  }
}
