import { MoviesCastRepository } from "@/domain/movie-stores/application/repositories/movies-cast/movies-cast-repository"
import { UpdadeMoviesCastUseCaseRequest } from "@/domain/movie-stores/application/use-cases/movies-cast/update-movies-cast-usecase"
import { MoviesCast } from "@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast"

export class InMemoryMoviesCastRepository implements MoviesCastRepository {
    public moviescast: MoviesCast[] = []

    async findById(id: string) {
        const moviedirector = this.moviescast.find((moviedirector) => id === moviedirector.id.toString())

        if (!moviedirector) return null

        return moviedirector
    }

    async findByDirector(actorsId: string, filmsId: string) {
        const moviesCast = this.moviescast.find(
            (moviesCast) => actorsId === moviesCast.actorsId.toString() && filmsId === moviesCast.filmsId.toString()
        )

        if (!moviesCast) return null

        return moviesCast
    }
    

    async findMany() {
        return this.moviescast
    }

    async create(moviesCast: MoviesCast) {
        this.moviescast.push(moviesCast)
        return moviesCast;
    }

    async update(id: string, moviesCastUpdate: UpdadeMoviesCastUseCaseRequest) {
        const moviesCastExisted = this.moviescast.find(
            (moviesCast) => id === moviesCast.id.toString()
        )
        
        if (moviesCastExisted) {
            moviesCastExisted.function = moviesCastUpdate.functionActors
        }

        const moviesCastIndex = this.moviescast.findIndex(
            (moviesCast) => id === moviesCast.id.toString()
        )
        this.moviescast.splice(moviesCastIndex, 1)

        if (moviesCastExisted) this.moviescast.push(moviesCastExisted)
    }

    async delete(id: string) {
        const moviesCastIndex = this.moviescast.findIndex((moviesCast) => id === moviesCast.id.toString())
        this.moviescast.splice(moviesCastIndex, 1)
    }
}