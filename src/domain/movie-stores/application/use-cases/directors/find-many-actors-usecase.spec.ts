import { InMemoryActorsRepository } from "test/repositories/in-memory-actors-repository"
import { CreateActorsUseCase } from "./create-directors-usecase"
import { FindManyActorsUseCase } from "./find-many-actors-usecase"
import { makeActors } from "test/factories/make-actors"

let inMemoryActorsRepository: InMemoryActorsRepository
let createActorsUseCase: CreateActorsUseCase
let sut: FindManyActorsUseCase

describe('Find Many Actors', () => {
  beforeEach(() => {
    inMemoryActorsRepository = new InMemoryActorsRepository()
    createActorsUseCase = new CreateActorsUseCase(inMemoryActorsRepository)
    sut = new FindManyActorsUseCase(inMemoryActorsRepository)
  })

  it('should be able to find many a actors', async () => {
    const newActor = makeActors()
    await createActorsUseCase.execute(newActor)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
