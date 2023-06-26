import { Actors, ActorsProps } from "@/domain/movie-stores/enterprise/entities/actors/actors"
import { faker } from "@faker-js/faker"

export function makeActors(
    override: Partial<ActorsProps> = {}
) {
    const actor = Actors.create({
        name: faker.person.fullName(),
        sex: 'Masculino',
        birth: new Date('1970-08-05'),
        country: faker.location.city(),
        ...override,
      }
    )

    return actor
}