import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUsersUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a user', async () => {
    const newUser = makeUsers()
    await sut.execute(newUser)

    expect(newUser.id).toBeTruthy()
  })
})
