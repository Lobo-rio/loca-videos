import { MoviesCast } from "@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast"

export interface MoviesCastRepository {
    findMany(): Promise<MoviesCast[]>
    create(moviesCast: MoviesCast): Promise<void>
    update(id: string, moviesCast: MoviesCast): Promise<void>
    delete(id: string): Promise<void>
}