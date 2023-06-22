import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'

export interface ActorsRepository {
  findById(id: string): Promise<Actors>
  findMany(): Promise<Actors[]>
  create(actors: Actors): Promise<void>
  update(id: string, actors: Actors): Promise<void>
  delete(id: string): Promise<void>
}
