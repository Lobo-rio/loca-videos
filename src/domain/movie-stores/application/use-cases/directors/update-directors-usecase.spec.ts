import { faker } from '@faker-js/faker'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryDirectorsRepository } from 'test/repositories/in-memory-directors-repository'
import { CreateDirectorsUseCase } from './create-directors-usecase'
import { UpdadeDirectorsUseCase } from './update-directors-usecase'
import { makeDirectors } from 'test/factories/make-directors'

let inMemoryDirectorsRepository: InMemoryDirectorsRepository
let createDirectorsUseCase: CreateDirectorsUseCase
let sut: UpdadeDirectorsUseCase

describe('Update Director', () => {
  beforeEach(() => {
    inMemoryDirectorsRepository = new InMemoryDirectorsRepository()
    createDirectorsUseCase = new CreateDirectorsUseCase(inMemoryDirectorsRepository)
    sut = new UpdadeDirectorsUseCase(inMemoryDirectorsRepository)
  })

  it('should be able to update a directors', async () => {
    const newDirector = makeDirectors()
    const directorCreated = await createDirectorsUseCase.execute(newDirector)
    let id: string = ''
    if (directorCreated.isRight()) id = directorCreated.value?.director.id.toString()

    const result = await sut.execute(
      id,
      {
        name: 'Gilberto Medeiros',
        sex: 'Masculino',
        birth: new Date('1970-08-07'),
        country: faker.location.city(),
      }
    )

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a director not found', async () => {
    const newDirector = makeDirectors()
    await createDirectorsUseCase.execute(newDirector)

    const result = await sut.execute(
        'director-test-1', 
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