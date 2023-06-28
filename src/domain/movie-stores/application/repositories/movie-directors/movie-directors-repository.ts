import { MovieDirectors } from '@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors'
import { UpdadeDirectorsUseCaseRequest } from '../../use-cases/directors/update-directors-usecase'

export interface MovieDirectorsRepository {
  findById(id: string): Promise<MovieDirectors | null>
  findByDirector(
    directorId: string,
    filmsId: string,
  ): Promise<MovieDirectors | null>
  findMany(): Promise<MovieDirectors[]>
  create(movieDirectors: MovieDirectors): Promise<MovieDirectors>
  update(id: string, movieDirectors: UpdadeDirectorsUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
