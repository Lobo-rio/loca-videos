import { DirectorsRepository } from "@/domain/movie-stores/application/repositories/directors/directors-repository"
import { UpdadeDirectorsUseCaseRequest } from "@/domain/movie-stores/application/use-cases/directors/update-directors-usecase"
import { Directors } from "@/domain/movie-stores/enterprise/entities/directors/directors"

export class InMemoryDirectorsRepository implements DirectorsRepository {
    
    public directors: Directors[] = []

    async findById(id: string) {
        const director = this.directors.find((director) => id === director.id.toString())

        if (!director) return null

        return director
    }

    async findByName(name: string) {
        const director = this.directors.find((director) => name === director.name)

        if (!director) return null

        return director
    }
   
    async findMany() {
        return this.directors
    }

    async create(director: Directors) {
        this.directors.push(director)
        return director;
    }

    async update(id: string, directorUpdate: UpdadeDirectorsUseCaseRequest) {
        const directorExisted = this.directors.find((director) => id === director.id.toString())
        
        if (directorExisted) {
            directorExisted.name = directorUpdate.name
            directorExisted.sex = directorUpdate.sex
            directorExisted.birth = directorUpdate.birth
            directorExisted.country = directorUpdate.country 
        }

        const directorIndex = this.directors.findIndex((director) => id === director.id.toString())
        this.directors.splice(directorIndex, 1)

        if (directorExisted) this.directors.push(directorExisted)
    }
    
    async delete(id: string) {
        const directorIndex = this.directors.findIndex((director) => id === director.id.toString())
        this.directors.splice(directorIndex, 1)
    }
}