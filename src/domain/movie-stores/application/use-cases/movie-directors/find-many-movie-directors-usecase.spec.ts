import { InMemoryMovieDirectorsRepository } from "test/repositories/in-memory-movie-directors-repository"
import { CreateMovieDirectorsUseCase } from "./create-movie-directors-usecase"
import { FindManyMovieDirectorsUseCase } from "./find-many-movie-directors-usecase"
import { makeMovieDirectors } from "test/factories/make-movie-directors"

let inMemoryMovieDirectorsRepository: InMemoryMovieDirectorsRepository
let createMovieDirectorsUseCase: CreateMovieDirectorsUseCase
let sut: FindManyMovieDirectorsUseCase

describe('Find Many MovieDirectors', () => {
  beforeEach(() => {
    inMemoryMovieDirectorsRepository = new InMemoryMovieDirectorsRepository()
    createMovieDirectorsUseCase = new CreateMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
    sut = new FindManyMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
  })

  it('should be able to find many a movie directors', async () => {
    const newMovieDirector = makeMovieDirectors()
    await createMovieDirectorsUseCase.execute(newMovieDirector)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
