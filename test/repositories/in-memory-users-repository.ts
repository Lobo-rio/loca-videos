import { UsersRepository } from "@/domain/movie-stores/application/repositories/users/users-repository";
import { User } from "@/domain/movie-stores/enterprise/entities/users/users";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []
    
    async create(user: User) {
        this.items.push(user)
    }
}