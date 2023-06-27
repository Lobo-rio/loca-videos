import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { ResourceExistedError } from '../errors/resource-existed-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUsersUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a user', async () => {
    const newUser = makeUsers()
    const result = await sut.execute(newUser)

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a user with the same email', async () => {
    let newUser: any, result: any

    for (let i = 0; i < 2; i++) {
      newUser = makeUsers()
      result = await sut.execute(newUser)
    }

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceExistedError)
  })
})
