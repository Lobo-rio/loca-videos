import { faker } from '@faker-js/faker'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryMovieDirectorsRepository } from 'test/repositories/in-memory-movie-directors-repository'
import { CreateMovieDirectorsUseCase } from './create-movie-directors-usecase'
import { UpdadeMovieDirectorsUseCase, UpdadeMovieDirectorsUseCaseRequest } from './update-movie-directors-usecase'
import { makeMovieDirectors } from 'test/factories/make-movie-directors'

let inMemoryMovieDirectorsRepository: InMemoryMovieDirectorsRepository
let createMovieDirectorsUseCase: CreateMovieDirectorsUseCase
let sut: UpdadeMovieDirectorsUseCase

describe('Update MovieDirector', () => {
  beforeEach(() => {
    inMemoryMovieDirectorsRepository = new InMemoryMovieDirectorsRepository()
    createMovieDirectorsUseCase = new CreateMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
    sut = new UpdadeMovieDirectorsUseCase(inMemoryMovieDirectorsRepository)
  })

  it('should be able to update a moviedirectors', async () => {
    const newMovieDirector = makeMovieDirectors()
    const moviedirectorCreated = await createMovieDirectorsUseCase.execute(newMovieDirector)
    let id: string = ''
    if (moviedirectorCreated.isRight()) id = moviedirectorCreated.value?.moviedirector.id.toString()

    const result = await sut.execute(id, {
      functionDirectors: faker.system.cron()
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a moviedirector not found', async () => {
    const newMovieDirector = makeMovieDirectors()
    await createMovieDirectorsUseCase.execute(newMovieDirector)

    const result = await sut.execute('moviedirector-test-1', {
      functionDirectors: faker.system.cron()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
