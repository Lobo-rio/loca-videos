import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { FindManyUsersUseCase } from './find-many-user-usecase'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: FindManyUsersUseCase

describe('Find Many Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut = new FindManyUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to find many a users', async () => {
    const newUser = makeUsers()
    await createUsersUseCase.execute(newUser)

    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
  })
})
