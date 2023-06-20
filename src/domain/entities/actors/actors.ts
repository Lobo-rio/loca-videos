import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface ActorsProps {
    name: string
    sex: string
    birth: Date
    country: string
    createdAt: Date
    updatedAt?: Date
}

export class Actors extends Entity<ActorsProps> {
    get name() {
        return this.props.name
    }

    get sex() {
        return this.props.sex
    }

    get birth() {
        return this.props.birth
    }

    get country() {
        return this.props.country
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set sex(sex: string) {
        this.props.sex = sex
        this.touch()
    }

    set birth(birth: Date) {
        this.props.birth = birth
        this.touch()
    }

    set country(country: string) {
        this.props.country = country
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<ActorsProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const actor = new Actors({
            ...props,
            createdAt: new Date(),
        }, id)

        return actor
    } 
}