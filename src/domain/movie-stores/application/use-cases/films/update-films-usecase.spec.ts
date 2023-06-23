import { faker } from '@faker-js/faker'

import { InMemoryFilmsRepository } from "test/repositories/in-memory-films-repository"
import { CreateFilmsUseCase } from "./create-films-usecase"
import { UpdadeFilmsUseCase } from "./update-films-usecase"
import { makeFilms } from "test/factories/make-films"
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryFilmsRepository: InMemoryFilmsRepository
let createFilmsUseCase: CreateFilmsUseCase
let sut: UpdadeFilmsUseCase

describe('Update Film', () => {
  beforeEach(() => {
    inMemoryFilmsRepository = new InMemoryFilmsRepository()
    createFilmsUseCase = new CreateFilmsUseCase(inMemoryFilmsRepository)
    sut = new UpdadeFilmsUseCase(inMemoryFilmsRepository)
  })

  it('should be able to update a Films', async () => {
    const newFilm = makeFilms()
    const filmCreated = await createFilmsUseCase.execute(newFilm)
    let id: string = ''
    if (filmCreated.isRight()) id = filmCreated.value?.film.id.toString()

    const result = await sut.execute(
      id,
      {
        description: faker.lorem.text(),
        launch: new Date(),
        boxOffice: 258969855,
        indications: faker.company.name(),
        basedOn: faker.animal.bird()
      }
    )

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a film not found', async () => {
    const newFilm = makeFilms()
    await createFilmsUseCase.execute(newFilm)

    const result = await sut.execute(
        'Film-test-1', 
        {
            description: faker.lorem.text(),
            launch: new Date(),
            boxOffice: 258969855,
            indications: faker.company.name(),
            basedOn: faker.animal.bird()
        })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})