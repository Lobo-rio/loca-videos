import { faker } from "@faker-js/faker"
import { User, UserProps } from "@/domain/movie-stores/enterprise/entities/users/users"

export function makeUsers(
    override: Partial<UserProps> = {}
) {
    const user = User.create({
        name: faker.lorem.sentence(),
        email: 'user-example@text.com',
        admin: true,
        sector: faker.company.name(),
        ...override,
      }
    )

    return user
}