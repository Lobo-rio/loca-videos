import { MovieDirectors } from "@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors"

export interface MovieDirectorsRepository {
    findMany(): Promise<MovieDirectors[]>
    create(movieDirectors: MovieDirectors): Promise<void>
    update(id: string, movieDirectors: MovieDirectors): Promise<void>
    delete(id: string): Promise<void>
}