import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { FindByIdUsersUseCase } from './find-by-id-user-usecase'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: FindByIdUsersUseCase

describe('Find By Id User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut = new FindByIdUsersUseCase(inMemoryUsersRepository)
  })

  it.skip('should be able to find by id a user', async () => {
    const newUser = makeUsers()
    const userCreated = await createUsersUseCase.execute(newUser)
    let id: string = ''
    if (userCreated.isRight()) id = userCreated.value?.user.id.toString()

    const result = await sut.execute(id)

    expect(result.isRight()).toEqual(true)
  })

  it('should be able to find by id a user not found', async () => {
    const newUser = makeUsers()
    await createUsersUseCase.execute(newUser)

    const result = await sut.execute('user-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
