import { InMemoryMovieDirectorsRepository } from 'test/repositories/in-memory-movie-directors-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateMovieDirectorsUseCase } from './create-movie-directors-usecase'
import { FindByIdMovieDirectorsUseCase } from './find-by-id-movie-directors-usecase'
import { makeMovieDirectors } from 'test/factories/make-movie-directors'

let inMemoryMovieDirectorsRepository: InMemoryMovieDirectorsRepository
let createMovieDirectorsUseCase: CreateMovieDirectorsUseCase
let sut: FindByIdMovieDirectorsUseCase

describe('Find By Id MovieDirector', () => {
  beforeEach(() => {
    inMemoryMovieDirectorsRepository = new InMemoryMovieDirectorsRepository()
    createMovieDirectorsUseCase = new CreateMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
    sut = new FindByIdMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
  })

  it('should be able to find by id a movie director', async () => {
    const newMovieDirector = makeMovieDirectors()
    const moviedirectorCreated = await createMovieDirectorsUseCase.execute(newMovieDirector)
    let id: string = ''
    if (moviedirectorCreated.isRight()) id = moviedirectorCreated.value?.movieDirectors.id.toString()

    const result = await sut.execute(id)

    expect(result.isRight()).toEqual(true)
  })

  it('should be able to find by id a movie director not found', async () => {
    const newMovieDirector = makeMovieDirectors()
    await createMovieDirectorsUseCase.execute(newMovieDirector)

    const result = await sut.execute('MovieDirector-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
