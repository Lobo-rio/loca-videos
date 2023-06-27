import { Directors } from '@/domain/movie-stores/enterprise/entities/directors/directors'
import { UpdadeDirectorsUseCaseRequest } from '../../use-cases/directors/update-directors-usecase'

export interface DirectorsRepository {
  findById(id: string): Promise<Directors | null>
  findByName(name: string): Promise<Directors | null>
  findMany(): Promise<Directors[]>
  create(directors: Directors): Promise<Directors>
  update(id: string, directors: UpdadeDirectorsUseCaseRequest): Promise<void>
  delete(id: string): Promise<void>
}
