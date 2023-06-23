import { InMemoryFilmsRepository } from "test/repositories/in-memory-films-repository"
import { CreateFilmsUseCase } from "./create-films-usecase"
import { FindManyFilmsUseCase } from "./find-many-film-usecase"
import { makeFilms } from "test/factories/make-films"

let inMemoryFilmsRepository: InMemoryFilmsRepository
let createFilmsUseCase: CreateFilmsUseCase
let sut: FindManyFilmsUseCase

describe('Find Many Films', () => {
  beforeEach(() => {
    inMemoryFilmsRepository = new InMemoryFilmsRepository()
    createFilmsUseCase = new CreateFilmsUseCase(inMemoryFilmsRepository)
    sut = new FindManyFilmsUseCase(inMemoryFilmsRepository)
  })

  it('should be able to find many a films', async () => {
    const newFilm = makeFilms()
    await createFilmsUseCase.execute(newFilm)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
