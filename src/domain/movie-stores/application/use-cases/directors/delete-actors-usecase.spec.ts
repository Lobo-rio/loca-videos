import { InMemoryActorsRepository } from 'test/repositories/in-memory-actors-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateActorsUseCase } from './create-directors-usecase'
import { DeleteActorsUseCase } from './delete-actors-usecase'
import { makeActors } from 'test/factories/make-actors'

let inMemoryActorsRepository: InMemoryActorsRepository
let createActorsUseCase: CreateActorsUseCase
let sut: DeleteActorsUseCase

describe('Delete Actor', () => {
  beforeEach(() => {
    inMemoryActorsRepository = new InMemoryActorsRepository()
    createActorsUseCase = new CreateActorsUseCase(inMemoryActorsRepository)
    sut = new DeleteActorsUseCase(inMemoryActorsRepository)
  })

  it('should be able to delete a actor', async () => {
    const newActor = makeActors()
    const actorCreated = await createActorsUseCase.execute(newActor)
    let id: string = ''
    if (actorCreated.isRight()) id = actorCreated.value?.actor.id.toString()

    const result = await sut.execute(id)

    expect(inMemoryActorsRepository.actors.length).toEqual(0)
    expect(result.isRight()).toEqual(true)
  })

  it('should be able to delte not found a actor', async () => {
    const newActor = makeActors()
    await createActorsUseCase.execute(newActor)
    
    const result = await sut.execute('actor-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
