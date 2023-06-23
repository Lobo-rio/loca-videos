import { faker } from "@faker-js/faker"
import { Films, FilmsProps } from "@/domain/movie-stores/enterprise/entities/films/films"
import { Slug } from "@/domain/movie-stores/enterprise/entities/value-objects/slug"

export function makeFilms(
    override: Partial<FilmsProps> = {}
) {
    const film = Films.create({
        title: 'Automatic Film In Test',
        slug: 'automatic-film-in-test',
        description: faker.lorem.text(),
        launch: new Date(),
        boxOffice: 1876098,
        indications: faker.company.name(),
        basedOn: faker.animal.cetacean(),
        ...override,
      }
    )

    return film
}