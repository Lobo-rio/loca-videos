import { FilmsRepository } from "@/domain/movie-stores/application/repositories/films/films-repository"
import { Films } from "@/domain/movie-stores/enterprise/entities/films/films"

export class InMemoryFilmsRepository implements FilmsRepository {
       public films: Films[] = []

    async findById(id: string) {
        const film = this.films.find((film) => id === film.id.toString())

        if (!film) return null

        return film
    }

    async findByTitle(title: string) {
        const film = this.films.find((film) => title === film.title)

        if (!film) return null

        return film
    }

    async findMany() {
        return this.films
    }

    async create(film: Films) {
        this.films.push(film)
        return film;
    }

    async update(id: string, film: Films) {
        const filmExisted = this.films.find((film) => id === film.id.toString())
    }
    
    async delete(id: string) {
        const filmIndex = this.films.findIndex((film) => id === film.id.toString())
        this.films.splice(filmIndex, 1)
    }
}