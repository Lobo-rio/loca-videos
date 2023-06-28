import { InMemoryMoviesCastRepository } from 'test/repositories/in-memory-movies-cast-repository'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { CreateMoviesCastUseCase } from './create-movies-cast-usecase'
import { makeMoviesCast } from 'test/factories/make-movies-actors'

let inMemoryMoviesCastRepository: InMemoryMoviesCastRepository
let sut: CreateMoviesCastUseCase

describe('Create Movie Actor', () => {
  beforeEach(() => {
    inMemoryMoviesCastRepository = new InMemoryMoviesCastRepository()
    sut = new CreateMoviesCastUseCase(inMemoryMoviesCastRepository)
  })

  it('should be able to create a movie actor', async () => {
    const newMoviesCast = makeMoviesCast()
    const result = await sut.execute(newMoviesCast)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a movies cast with the same actor', async () => {
    let newMoviesCast: any, result: any

    for (let i = 0; i < 2; i++) {
      newMoviesCast = makeMoviesCast({
        filmsId: 'films-test-1',
        actorsId: 'actors-test-1',
      })
      result = await sut.execute(newMoviesCast)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
