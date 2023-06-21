import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { FindByIdUsersUseCase } from './find-by-id-user-usecase'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: FindByIdUsersUseCase

describe('Find By Id User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut: new FindByIdUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to find by id a user', async () => {
    const newUser = makeUsers()
    await createUsersUseCase.execute(newUser)

    const { user } = await sut.execute(newUser.id.toString())
    
    expect(user.id).toBeTruthy()
  })
})