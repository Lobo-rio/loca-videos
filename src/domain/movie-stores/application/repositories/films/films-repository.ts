import { Films } from "@/domain/movie-stores/enterprise/entities/films/films"

export interface FilmsRepository {
    findById(id: string): Promise<Films>
    findMany(): Promise<Films[]>
    create(films: Films): Promise<void>
    update(id: string, films: Films): Promise<void>
    delete(id: string): Promise<void>
  }