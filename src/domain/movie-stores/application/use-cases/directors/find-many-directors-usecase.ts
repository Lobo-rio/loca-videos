import { Either, right } from '@/core/types/either'
import { Directors } from '@/domain/movie-stores/enterprise/entities/directors/directors'
import { DirectorsRepository } from '../../repositories/directors/directors-repository'

type FindManyDirectorsUseCaseResponse = Either<null, {
  directors: Directors[]
}>

export class FindManyDirectorsUseCase {
  constructor(private readonly directorRepository: DirectorsRepository) {}

  async execute(): Promise<FindManyDirectorsUseCaseResponse> {
    const directors = await this.directorRepository.findMany()

    return right({
      directors,
    })
  }
}
