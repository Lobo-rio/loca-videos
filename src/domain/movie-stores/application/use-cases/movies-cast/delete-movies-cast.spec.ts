import { InMemoryMoviesCastRepository } from 'test/repositories/in-memory-movies-cast-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateMoviesCastUseCase } from './create-movies-cast-usecase'
import { DeleteMoviesCastUseCase } from './delete-movies-cast-usecase'
import { makeMoviesCast } from 'test/factories/make-movies-actors'

let inMemoryMoviesCastRepository: InMemoryMoviesCastRepository
let createMoviesCastUseCase: CreateMoviesCastUseCase
let sut: DeleteMoviesCastUseCase

describe('Delete Movie MoviesCast', () => {
  beforeEach(() => {
    inMemoryMoviesCastRepository = new InMemoryMoviesCastRepository()
    createMoviesCastUseCase = new CreateMoviesCastUseCase(inMemoryMoviesCastRepository)
    sut = new DeleteMoviesCastUseCase(inMemoryMoviesCastRepository)
  })

  it('should be able to delete a moviescast', async () => {
    const newMoviesCast = makeMoviesCast()
    const moviescastCreated = await createMoviesCastUseCase.execute(newMoviesCast)
    let id: string = ''
    if (moviescastCreated.isRight()) id = moviescastCreated.value?.moviesCast.id.toString()

    const result = await sut.execute(id)

    expect(inMemoryMoviesCastRepository.moviescast.length).toEqual(0)
    expect(result.isRight()).toEqual(true)
  })

  it('should be able to delte not found a moviescast', async () => {
    const newMoviesCast = makeMoviesCast()
    await createMoviesCastUseCase.execute(newMoviesCast)

    const result = await sut.execute('moviescast-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
