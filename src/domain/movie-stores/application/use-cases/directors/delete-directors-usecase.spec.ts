import { InMemoryDirectorsRepository } from 'test/repositories/in-memory-directors-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateDirectorsUseCase } from './create-directors-usecase'
import { DeleteDirectorsUseCase } from './delete-directors-usecase'
import { makeDirectors } from 'test/factories/make-directors'

let inMemoryDirectorsRepository: InMemoryDirectorsRepository
let createDirectorsUseCase: CreateDirectorsUseCase
let sut: DeleteDirectorsUseCase

describe('Delete Director', () => {
  beforeEach(() => {
    inMemoryDirectorsRepository = new InMemoryDirectorsRepository()
    createDirectorsUseCase = new CreateDirectorsUseCase(inMemoryDirectorsRepository)
    sut = new DeleteDirectorsUseCase(inMemoryDirectorsRepository)
  })

  it('should be able to delete a director', async () => {
    const newDirector = makeDirectors()
    const directorCreated = await createDirectorsUseCase.execute(newDirector)
    let id: string = ''
    if (directorCreated.isRight()) id = directorCreated.value?.director.id.toString()

    const result = await sut.execute(id)

    expect(inMemoryDirectorsRepository.directors.length).toEqual(0)
    expect(result.isRight()).toEqual(true)
  })

  it('should be able to delte not found a Director', async () => {
    const newDirector = makeDirectors()
    await createDirectorsUseCase.execute(newDirector)
    
    const result = await sut.execute('director-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
