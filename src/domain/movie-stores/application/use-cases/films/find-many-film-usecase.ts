import { Either, right } from '@/core/types/either'
import { Films } from '@/domain/movie-stores/enterprise/entities/films/films'
import { FilmsRepository } from '../../repositories/films/films-repository'

type FindManyFilmsUseCaseResponse = Either<
  null,
  {
    films: Films[]
  }
>

export class FindManyFilmsUseCase {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async execute(): Promise<FindManyFilmsUseCaseResponse> {
    const films = await this.filmRepository.findMany()

    return right({
      films,
    })
  }
}
