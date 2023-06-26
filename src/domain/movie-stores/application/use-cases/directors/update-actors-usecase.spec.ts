import { faker } from '@faker-js/faker'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryActorsRepository } from 'test/repositories/in-memory-actors-repository'
import { CreateActorsUseCase } from './create-directors-usecase'
import { UpdadeActorsUseCase } from './update-actors-usecase'
import { makeActors } from 'test/factories/make-actors'

let inMemoryActorsRepository: InMemoryActorsRepository
let createActorsUseCase: CreateActorsUseCase
let sut: UpdadeActorsUseCase

describe('Update Actor', () => {
  beforeEach(() => {
    inMemoryActorsRepository = new InMemoryActorsRepository()
    createActorsUseCase = new CreateActorsUseCase(inMemoryActorsRepository)
    sut = new UpdadeActorsUseCase(inMemoryActorsRepository)
  })

  it('should be able to update a actors', async () => {
    const newActor = makeActors()
    const actorCreated = await createActorsUseCase.execute(newActor)
    let id: string = ''
    if (actorCreated.isRight()) id = actorCreated.value?.actor.id.toString()

    const result = await sut.execute(
      id,
      {
        name: 'Gilberto Medeiros',
        sex: 'Masculino',
        birth: new Date('1970-08-05'),
        country: faker.location.city(),
      }
    )

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a actor not found', async () => {
    const newActor = makeActors()
    await createActorsUseCase.execute(newActor)

    const result = await sut.execute(
        'actor-test-1', 
        {
          name: 'Gilberto Medeiros',
          sex: 'Masculino',
          birth: new Date('1970-08-05'),
          country: faker.location.city(),
        })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})