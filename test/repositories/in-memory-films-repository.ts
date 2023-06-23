import { FilmsRepository } from "@/domain/movie-stores/application/repositories/films/films-repository"
import { UpdadeFilmsUseCaseRequest } from "@/domain/movie-stores/application/use-cases/films/update-films-usecase"
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

    async update(id: string, filmUpdate: UpdadeFilmsUseCaseRequest) {
        const filmExisted = this.films.find((film) => id === film.id.toString())
        
        if (filmExisted) {
            filmExisted.description = filmUpdate.description
            filmExisted.launch = filmUpdate.launch
            filmExisted.boxOffice = filmUpdate.boxOffice
            filmExisted.indications = filmUpdate.indications
            filmExisted.basedOn = filmUpdate.basedOn
        }

        const filmIndex = this.films.findIndex((film) => id === film.id.toString())
        this.films.splice(filmIndex, 1)

        if (filmExisted) this.films.push(filmExisted)
    }
    
    async delete(id: string) {
        const filmIndex = this.films.findIndex((film) => id === film.id.toString())
        this.films.splice(filmIndex, 1)
    }
}