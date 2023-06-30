import { InMemoryMovieDirectorsRepository } from 'test/repositories/in-memory-movie-directors-repository'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { CreateMovieDirectorsUseCase } from './create-movie-directors-usecase'
import { makeMovieDirectors } from 'test/factories/make-movie-directors'

let inMemoryMovieDirectorsRepository: InMemoryMovieDirectorsRepository
let sut: CreateMovieDirectorsUseCase

describe('Create Movie Director', () => {
  beforeEach(() => {
    inMemoryMovieDirectorsRepository = new InMemoryMovieDirectorsRepository()
    sut = new CreateMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
  })

  it('should be able to create a movie director', async () => {
    const newMovieDirector = makeMovieDirectors()
    const result = await sut.execute(newMovieDirector)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a moviedirector with the same director', async () => {
    let newMovieDirector: any, result: any

    for (let i = 0; i < 2; i++) {
      newMovieDirector = makeMovieDirectors({
        filmsId: 'films-test-1',
        directorsId: 'movie-directors-test-1',
      })
      result = await sut.execute(newMovieDirector)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
