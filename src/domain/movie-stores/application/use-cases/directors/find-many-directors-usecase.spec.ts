import { InMemoryDirectorsRepository } from 'test/repositories/in-memory-directors-repository'
import { CreateDirectorsUseCase } from './create-directors-usecase'
import { FindManyDirectorsUseCase } from './find-many-directors-usecase'
import { makeDirectors } from 'test/factories/make-directors'

let inMemoryDirectorsRepository: InMemoryDirectorsRepository
let createDirectorsUseCase: CreateDirectorsUseCase
let sut: FindManyDirectorsUseCase

describe('Find Many Directors', () => {
  beforeEach(() => {
    inMemoryDirectorsRepository = new InMemoryDirectorsRepository()
    createDirectorsUseCase = new CreateDirectorsUseCase(
      inMemoryDirectorsRepository,
    )
    sut = new FindManyDirectorsUseCase(inMemoryDirectorsRepository)
  })

  it('should be able to find many a Directors', async () => {
    const newDirector = makeDirectors()
    await createDirectorsUseCase.execute(newDirector)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
