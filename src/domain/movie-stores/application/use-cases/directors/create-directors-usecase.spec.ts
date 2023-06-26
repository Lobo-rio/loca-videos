import { InMemoryDirectorsRepository } from 'test/repositories/in-memory-directors-repository'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { CreateDirectorsUseCase } from './create-directors-usecase'
import { makeDirectors } from 'test/factories/make-directors'

let inMemoryDirectorsRepository: InMemoryDirectorsRepository
let sut: CreateDirectorsUseCase

describe('Create Director', () => {
  beforeEach(() => {
    inMemoryDirectorsRepository = new InMemoryDirectorsRepository()
    sut = new CreateDirectorsUseCase(inMemoryDirectorsRepository)
  })

  it('should be able to create a director', async () => {
    const newDirector = makeDirectors()
    const result = await sut.execute(newDirector)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a director with the same name', async () => {
    let newDirector: any, result: any

    for (let i = 0; i < 2; i++) {
      newDirector = makeDirectors({ name: 'Gilberto Medeiros' })
      result = await sut.execute(newDirector)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
