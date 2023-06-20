import { Entity } from "../../../core/entities/entity"
import { UniqueEntityID } from "../../../core/entities/unique-entity-id"
import { Optional } from "../../../core/types/optional"

interface MoviesCastProps {
    filmsId: UniqueEntityID
    actorsId: UniqueEntityID
    function: string
    createdAt: Date
    updatedAt?: Date
}

export class MoviesCast extends Entity<MoviesCastProps> { 
    get filmsId() {
        return this.props.filmsId
    }

    get actorsId() {
        return this.props.actorsId
    }

    get function() {
        return this.props.function
    }

    set function(functions: string) {
        this.props.function = functions
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<MoviesCastProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const moviesCast = new MoviesCast({
            ...props,
            createdAt: new Date(),
        }, id)

        return moviesCast
    }
}