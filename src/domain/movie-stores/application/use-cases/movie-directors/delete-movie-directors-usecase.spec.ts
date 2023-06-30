import { makeMovieDirectors } from 'test/factories/make-movie-directors'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { DeleteMovieDirectorsUseCase } from './delete-movie-directors-usecase'
import { InMemoryMovieDirectorsRepository } from 'test/repositories/in-memory-movie-directors-repository'
import { CreateMovieDirectorsUseCase } from './create-movie-directors-usecase'

let inMemoryMovieDirectorsRepository: InMemoryMovieDirectorsRepository
let createMovieDirectorsUseCase: CreateMovieDirectorsUseCase
let sut: DeleteMovieDirectorsUseCase

describe('Delete Movie Director', () => {
  beforeEach(() => {
    inMemoryMovieDirectorsRepository = new InMemoryMovieDirectorsRepository()
    createMovieDirectorsUseCase = new CreateMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
    sut = new DeleteMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
  })

  it('should be able to delete a movie directors', async () => {
    const newMovieDirectors = makeMovieDirectors()
    const movieDirectorCreated = await createMovieDirectorsUseCase.execute(newMovieDirectors)
    let id: string = ''
    if (movieDirectorCreated.isRight()) id = movieDirectorCreated.value?.movieDirectors.id.toString()

    const result = await sut.execute(id)

    expect(inMemoryMovieDirectorsRepository.moviedirectors.length).toEqual(0)
    expect(result.isRight()).toEqual(true)
  })

  it('should be able to delte not found a movie directors', async () => {
    const newMovieDirectors = makeMovieDirectors()
    await createMovieDirectorsUseCase.execute(newMovieDirectors)

    const result = await sut.execute('movie-director-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
