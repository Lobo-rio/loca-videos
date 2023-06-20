import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface UserProps {
    name: string
    email: string
    admin: boolean
    sector: string
    createdAt: Date
    updatedAt?: Date
}


export class User extends Entity<UserProps> {
    get name() {
        return this.props.name
    }

    get email() {
        return this.props.email
    }

    get admin() {
        return this.props.admin
    }

    get sector() {
        return this.props.sector
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set name(name: string) {
        this.props.name = name
        this.touch()
    }

    set admin(admin: boolean) {
        this.props.admin = admin
        this.touch()
    }

    set sector(sector: string) {
        this.props.sector = sector
        this.touch()
    }

    static create(
        props: Optional<UserProps, 'createdAt'>,
        id?: UniqueEntityID
    ) {
        const user = new User({
            ...props,
            createdAt: new Date(),
        }, id)

        return user
    }   
}