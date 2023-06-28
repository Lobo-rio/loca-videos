import { InMemoryMoviesCastRepository } from "test/repositories/in-memory-movies-cast-repository"
import { CreateMoviesCastUseCase } from "./create-movies-cast-usecase"
import { FindManyMoviesCastUseCase } from "./find-many-movies-cast-usecase"
import { makeMoviesCast } from "test/factories/make-movies-actors"

let inMemoryMoviesCastRepository: InMemoryMoviesCastRepository
let createMoviesCastUseCase: CreateMoviesCastUseCase
let sut: FindManyMoviesCastUseCase

describe('Find Many Movies Cast', () => {
  beforeEach(() => {
    inMemoryMoviesCastRepository = new InMemoryMoviesCastRepository()
    createMoviesCastUseCase = new CreateMoviesCastUseCase(inMemoryMoviesCastRepository)
    sut = new FindManyMoviesCastUseCase(inMemoryMoviesCastRepository)
  })

  it('should be able to find many a movies cast', async () => {
    const newMoviesCast = makeMoviesCast()
    await createMoviesCastUseCase.execute(newMoviesCast)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
