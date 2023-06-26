import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'

export interface ActorsRepository {
  findById(id: string): Promise<Actors | null>
  findByName(name: string): Promise<Actors | null>
  findMany(): Promise<Actors[]>
  create(actor: Actors): Promise<Actors>
  update(id: string, actors: Actors): Promise<void>
  delete(id: string): Promise<void>
}
