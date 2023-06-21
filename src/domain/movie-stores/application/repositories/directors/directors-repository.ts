import { Directors } from "@/domain/movie-stores/enterprise/entities/directors/directors"

export interface DirectorsRepository {
    findById(id: string): Promise<Directors>
    findMany(): Promise<Directors[]>
    create(directors: Directors): Promise<void>
    update(id: string, directors: Directors): Promise<void>
    delete(id: string): Promise<void>
}