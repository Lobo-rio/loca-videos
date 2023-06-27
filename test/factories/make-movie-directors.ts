import { faker } from "@faker-js/faker"
import { randomUUID } from "crypto"
import { MovieDirectors, MovieDirectorsProps } from "@/domain/movie-stores/enterprise/entities/movie-directors/movie-directors"

export function makeMovieDirectors(
    override: Partial<MovieDirectorsProps> = {}
) {
    const moviedirector = MovieDirectors.create({
        filmsId: randomUUID(),
        directorsId: randomUUID(), 
        function: faker.system.cron(),
        ...override,
      }
    )

    return moviedirector
}