import { faker } from "@faker-js/faker"
import { User, UserProps } from "@/domain/movie-stores/enterprise/entities/users/users"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export function makeUsers(
    override: Partial<UserProps> = {}
) {
    const user = User.create({
        name: faker.lorem.sentence(),
        email: 'user-example@text.com',
        admin: true,
        sector: faker.animal.horse(),
        ...override,
      }
    )

    return user
}