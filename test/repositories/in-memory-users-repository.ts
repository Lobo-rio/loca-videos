import { UsersRepository } from "@/domain/movie-stores/application/repositories/users/users-repository";
import { User } from "@/domain/movie-stores/enterprise/entities/users/users";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async findById(id: string) {
        const item = this.items.find((item) => id === item.id.toString())

        if (!item) return null
        
        return item
    }
    async findMany() {
        return this.items
    }
    async create(user: User) {
        this.items.push(user)
    }
    update(id: string, user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string) {
        const itemIndex = this.items.findIndex((item) => id === item.id.toString())
        this.items.splice(itemIndex, 1)
    }
}