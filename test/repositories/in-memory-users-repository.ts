import { UsersRepository } from "@/domain/movie-stores/application/repositories/users/users-repository";
import { User } from "@/domain/movie-stores/enterprise/entities/users/users";

export class InMemoryUsersRepository implements UsersRepository {
    
    public users: User[] = []

    async findById(id: string) {
        const user = this.users.find((user) => id === user.id.toString())

        if (!user) return null
        
        return user
    }

    async findByEmail(email: string) {
        const user = this.users.find((user) => email === user.email)

        if (!user) return null
        
        return user
    }

    async findMany() {
        return this.users
    }

    async create(user: User) {
        this.users.push(user)
    }

    async update(id: string, user: User) {
        const userExisted = this.users.find((user) => id === user.id.toString())
    }
    
    async delete(id: string) {
        const userIndex = this.users.findIndex((user) => id === user.id.toString())
        this.users.splice(userIndex, 1)
    }
}