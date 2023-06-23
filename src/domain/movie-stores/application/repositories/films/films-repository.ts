import { Films } from '@/domain/movie-stores/enterprise/entities/films/films'

export interface FilmsRepository {
  findById(id: string): Promise<Films | null>
  findByTitle(title: string): Promise<Films | null>
  findMany(): Promise<Films[]>
  create(films: Films): Promise<Films>
  update(id: string, films: Films): Promise<void>
  delete(id: string): Promise<void>
}
