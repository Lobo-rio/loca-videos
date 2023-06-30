import { MovieDirectorsRepository } from "@/domain/movie-stores/application/repositories/movie-directors/movie-directors-repository"
import { UpdadeMovieDirectorsUseCaseRequest } from "@/domain/movie-stores/application/use-cases/movie-directors/update-movie-directors-usecase"
import { MovieDirectors } from "@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors"

export class InMemoryMovieDirectorsRepository implements MovieDirectorsRepository {
    public moviedirectors: MovieDirectors[] = []

    async findById(id: string) {
        const moviedirector = this.moviedirectors.find((moviedirector) => id === moviedirector.id.toString())

        if (!moviedirector) return null

        return moviedirector
    }

    async findByDirector(directorsId: string, filmsId: string) {
        const moviedirector = this.moviedirectors.find(
            (moviedirector) => directorsId === moviedirector.directorsId.toString() && filmsId === moviedirector.filmsId.toString()
        )

        if (!moviedirector) return null

        return moviedirector
    }
    

    async findMany() {
        return this.moviedirectors
    }

    async create(moviedirector: MovieDirectors) {
        this.moviedirectors.push(moviedirector)
        return moviedirector;
    }

    async update(id: string, movieDirectorsUpdate: UpdadeMovieDirectorsUseCaseRequest) {
        const moviedirectorExisted = this.moviedirectors.find(
            (moviedirector) => id === moviedirector.id.toString()
        )
        
        if (moviedirectorExisted) {
            moviedirectorExisted.function = movieDirectorsUpdate.functionDirectors
        }

        const moviedirectorIndex = this.moviedirectors.findIndex(
            (moviedirector) => id === moviedirector.id.toString()
        )
        this.moviedirectors.splice(moviedirectorIndex, 1)

        if (moviedirectorExisted) this.moviedirectors.push(moviedirectorExisted)
    }

    async delete(id: string) {
        const moviedirectorIndex = this.moviedirectors.findIndex((moviedirector) => id === moviedirector.id.toString())
        this.moviedirectors.splice(moviedirectorIndex, 1)
    }
}