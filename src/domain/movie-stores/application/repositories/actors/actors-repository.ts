import { Actors } from '@/domain/movie-stores/enterprise/entities/actors/actors'
import { UpdadeActorsUseCaseRequest } from '../../use-cases/actors/update-actors-usecase'

export interface ActorsRepository {
  findById(id: string): Promise<Actors | null>
  findByName(name: string): Promise<Actors | null>
  findMany(): Promise<Actors[]>
  create(actor: Actors): Promise<Actors>
  update(id: string, actors: UpdadeActorsUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
