import { ActorsRepository } from "@/domain/movie-stores/application/repositories/actors/actors-repository"
import { UpdadeActorsUseCaseRequest } from "@/domain/movie-stores/application/use-cases/actors/update-actors-usecase"
import { Actors } from "@/domain/movie-stores/enterprise/entities/actors/actors"

export class InMemoryActorsRepository implements ActorsRepository {
    
    public actors: Actors[] = []

    async findById(id: string) {
        const actor = this.actors.find((actor) => id === actor.id.toString())

        if (!actor) return null

        return actor
    }

    async findByName(name: string) {
        const actor = this.actors.find((actor) => name === actor.name)

        if (!actor) return null

        return actor
    }
   
    async findMany() {
        return this.actors
    }

    async create(actor: Actors) {
        this.actors.push(actor)
        return actor;
    }

    async update(id: string, actorUpdate: UpdadeActorsUseCaseRequest) {
        const actorExisted = this.actors.find((actor) => id === actor.id.toString())
        
        if (actorExisted) {
            actorExisted.name = actorUpdate.name
            actorExisted.sex = actorUpdate.sex
            actorExisted.birth = actorUpdate.birth
            actorExisted.country = actorUpdate.country 
        }

        const actorIndex = this.actors.findIndex((actor) => id === actor.id.toString())
        this.actors.splice(actorIndex, 1)

        if (actorExisted) this.actors.push(actorExisted)
    }
    
    async delete(id: string) {
        const actorIndex = this.actors.findIndex((actor) => id === actor.id.toString())
        this.actors.splice(actorIndex, 1)
    }
}