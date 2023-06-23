import { InMemoryFilmsRepository } from 'test/repositories/in-memory-films-repository'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { CreateFilmsUseCase } from './create-films-usecase'
import { makeFilms } from 'test/factories/make-films'

let inMemoryFilmsRepository: InMemoryFilmsRepository
let sut: CreateFilmsUseCase

describe('Create Film', () => {
  beforeEach(() => {
    inMemoryFilmsRepository = new InMemoryFilmsRepository()
    sut = new CreateFilmsUseCase(inMemoryFilmsRepository)
  })

  it('should be able to create a film', async () => {
    const newFilm = makeFilms()
    const result = await sut.execute(newFilm)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a film with the same title', async () => {
    let newFilm: any, result: any

    for (let i = 0; i < 2; i++) {
      newFilm = makeFilms()
      result = await sut.execute(newFilm)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
