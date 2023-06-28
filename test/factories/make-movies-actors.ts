import { faker } from "@faker-js/faker"
import { randomUUID } from "crypto"
import { MoviesCast, MoviesCastProps } from "@/domain/movie-stores/enterprise/entities/movies-cast/movies-cast"

export function makeMoviesCast(
    override: Partial<MoviesCastProps> = {}
) {
    const moviedirector = MoviesCast.create({
        filmsId: randomUUID(),
        actorsId: randomUUID(), 
        function: faker.system.cron(),
        ...override,
      }
    )

    return moviedirector
}