import { InMemoryActorsRepository } from 'test/repositories/in-memory-actors-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateActorsUseCase } from './create-directors-usecase'
import { FindByIdActorsUseCase } from './find-by-id-actors-usecase'
import { makeActors } from 'test/factories/make-actors'

let inMemoryActorsRepository: InMemoryActorsRepository
let createActorsUseCase: CreateActorsUseCase
let sut: FindByIdActorsUseCase

describe('Find By Id Actor', () => {
  beforeEach(() => {
    inMemoryActorsRepository = new InMemoryActorsRepository()
    createActorsUseCase = new CreateActorsUseCase(inMemoryActorsRepository)
    sut = new FindByIdActorsUseCase(inMemoryActorsRepository)
  })

  it('should be able to find by id a actor', async () => {
    const newActor = makeActors()
    const actorCreated = await createActorsUseCase.execute(newActor)
    let id: string = ''
    if (actorCreated.isRight()) id = actorCreated.value?.actor.id.toString()

    const result = await sut.execute(id)

    expect(result.isRight()).toEqual(true)
  })

  it('should be able to find by id a actor not found', async () => {
    const newActor = makeActors()
    await createActorsUseCase.execute(newActor)

    const result = await sut.execute('Actor-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
