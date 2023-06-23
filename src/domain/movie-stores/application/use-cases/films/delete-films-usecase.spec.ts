import { InMemoryFilmsRepository } from 'test/repositories/in-memory-films-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateFilmsUseCase } from './create-films-usecase'
import { DeleteFilmsUseCase } from './delete-films-usecase'
import { makeFilms } from 'test/factories/make-films'

let inMemoryFilmsRepository: InMemoryFilmsRepository
let createFilmsUseCase: CreateFilmsUseCase
let sut: DeleteFilmsUseCase

describe('Delete Film', () => {
  beforeEach(() => {
    inMemoryFilmsRepository = new InMemoryFilmsRepository()
    createFilmsUseCase = new CreateFilmsUseCase(inMemoryFilmsRepository)
    sut = new DeleteFilmsUseCase(inMemoryFilmsRepository)
  })

  it('should be able to delete a film', async () => {
    const newFilm = makeFilms()
    const filmCreated = await createFilmsUseCase.execute(newFilm)
    let id: string = ''
    if (filmCreated.isRight()) id = filmCreated.value?.film.id.toString()

    const result = await sut.execute(id)

    expect(inMemoryFilmsRepository.films.length).toEqual(0)
    expect(result.isRight()).toEqual(true)
  })

  it('should be able to delte not found a Film', async () => {
    const newFilm = makeFilms()
    await createFilmsUseCase.execute(newFilm)
    
    const result = await sut.execute('Film-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
