import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface MovieDirectorsProps {
    filmsId: UniqueEntityID
    directorsId: UniqueEntityID
    function: string
    createdAt: Date
    updatedAt?: Date
}

export class MovieDirectors extends Entity<MovieDirectorsProps> { 
    get filmsId() {
        return this.props.filmsId
    }

    get directorsId() {
        return this.props.directorsId
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
        props: Optional<MovieDirectorsProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const movieDirector = new MovieDirectors({
            ...props,
            createdAt: new Date(),
        }, id)

        return movieDirector
    }
}