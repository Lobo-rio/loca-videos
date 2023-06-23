import { InMemoryFilmsRepository } from 'test/repositories/in-memory-films-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateFilmsUseCase } from './create-films-usecase'
import { FindByIdFilmsUseCase } from './find-by-id-film-usecase'
import { makeFilms } from 'test/factories/make-films'

let inMemoryFilmsRepository: InMemoryFilmsRepository
let createFilmsUseCase: CreateFilmsUseCase
let sut: FindByIdFilmsUseCase

describe('Find By Id Film', () => {
  beforeEach(() => {
    inMemoryFilmsRepository = new InMemoryFilmsRepository()
    createFilmsUseCase = new CreateFilmsUseCase(inMemoryFilmsRepository)
    sut = new FindByIdFilmsUseCase(inMemoryFilmsRepository)
  })

  it('should be able to find by id a film', async () => {
    const newFilm = makeFilms()
    const filmCreated = await createFilmsUseCase.execute(newFilm)
    let id: string = ''
    if (filmCreated.isRight()) id = filmCreated.value?.film.id.toString()

    const result = await sut.execute(id)

    expect(result.isRight()).toEqual(true)
  })

  it('should be able to find by id a film not found', async () => {
    const newFilm = makeFilms()
    await createFilmsUseCase.execute(newFilm)

    const result = await sut.execute('Film-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
