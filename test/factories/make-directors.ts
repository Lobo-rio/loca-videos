import { faker } from "@faker-js/faker"
import { Directors, DirectorsProps } from "@/domain/movie-stores/enterprise/entities/directors/directors"

export function makeDirectors(
    override: Partial<DirectorsProps> = {}
) {
    const director = Directors.create({
        name: faker.person.fullName(),
        sex: 'Masculino',
        birth: new Date('1970-08-05'),
        country: faker.location.city(),
        ...override,
      }
    )

    return director
}