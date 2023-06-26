import { InMemoryActorsRepository } from 'test/repositories/in-memory-actors-repository'
import { ResourceExistedError } from '../errors/resource-existed-error'
import { CreateActorsUseCase } from './create-actors-usecase'
import { makeActors } from 'test/factories/make-actors'

let inMemoryActorsRepository: InMemoryActorsRepository
let sut: CreateActorsUseCase

describe('Create Actor', () => {
  beforeEach(() => {
    inMemoryActorsRepository = new InMemoryActorsRepository()
    sut = new CreateActorsUseCase(inMemoryActorsRepository)
  })

  it('should be able to create a actor', async () => {
    const newActor = makeActors()
    const result = await sut.execute(newActor)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a actor with the same name', async () => {
    let newActor: any, result: any

    for (let i = 0; i < 2; i++) {
      newActor = makeActors({ name: 'Gilberto Medeiros' })
      result = await sut.execute(newActor)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
