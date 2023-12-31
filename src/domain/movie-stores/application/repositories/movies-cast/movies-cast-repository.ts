import { MoviesCast } from '@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast'
import { UpdadeMoviesCastUseCaseRequest } from '../../use-cases/movies-cast/update-movies-cast-usecase'

export interface MoviesCastRepository {
  findById(id: string): Promise<MoviesCast | null>
  findByDirector(
    directorId: string,
    filmsId: string,
  ): Promise<MoviesCast | null>
  findMany(): Promise<MoviesCast[]>
  create(moviesCast: MoviesCast): Promise<MoviesCast | void>
  update(id: string, moviesCast: UpdadeMoviesCastUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
