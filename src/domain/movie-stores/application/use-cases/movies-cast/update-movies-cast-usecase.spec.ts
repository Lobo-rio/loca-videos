import { faker } from '@faker-js/faker'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryMoviesCastRepository } from 'test/repositories/in-memory-movies-cast-repository'
import { CreateMoviesCastUseCase } from './create-movies-cast-usecase'
import { UpdadeMoviesCastUseCase, UpdadeMoviesCastUseCaseRequest } from './update-movies-cast-usecase'
import { makeMoviesCast } from 'test/factories/make-movies-actors'

let inMemoryMoviesCastRepository: InMemoryMoviesCastRepository
let createMoviesCastUseCase: CreateMoviesCastUseCase
let sut: UpdadeMoviesCastUseCase

describe('Update Movies Cast', () => {
  beforeEach(() => {
    inMemoryMoviesCastRepository = new InMemoryMoviesCastRepository()
    createMoviesCastUseCase = new CreateMoviesCastUseCase(inMemoryMoviesCastRepository)
    sut = new UpdadeMoviesCastUseCase(inMemoryMoviesCastRepository)
  })

  it('should be able to update a movies cast', async () => {
    const newMoviesCast = makeMoviesCast()
    const moviesCastCreated = await createMoviesCastUseCase.execute(newMoviesCast)
    let id: string = ''
    if (moviesCastCreated.isRight()) id = moviesCastCreated.value?.moviesCast.id.toString()

    const result = await sut.execute(id, {
      functionActors: faker.system.cron()
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a movies cast not found', async () => {
    const newMoviesCast = makeMoviesCast()
    await createMoviesCastUseCase.execute(newMoviesCast)

    const result = await sut.execute('moviescast-test-1', {
      functionActors: faker.system.cron()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
