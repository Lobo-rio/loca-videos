import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { FindByIdUsersUseCase } from './find-by-id-user-usecase'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: FindByIdUsersUseCase

describe('Find By Id User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut = new FindByIdUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to find by id a user', async () => {
    const newUser = makeUsers()
    const userCreated = await createUsersUseCase.execute(newUser)
    const id: string = userCreated.user.id.toString()

    const { user } = await sut.execute(id)

    expect(user.id.toString()).toEqual(id)
  })

  it('should be able to find by id a user not found', async () => {
    const newUser = makeUsers()
    await createUsersUseCase.execute(newUser)

    expect(() => {
      return sut.execute('user-test-1')
    }).rejects.toBeInstanceOf(Error)
  })
})
