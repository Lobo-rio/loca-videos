import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { DeleteUsersUseCase } from './delete-user-usecase'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: DeleteUsersUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut = new DeleteUsersUseCase(inMemoryUsersRepository)
  })

  it.skip('should be able to delete a user', async () => {
    const newUser = makeUsers()
    const userCreated = await createUsersUseCase.execute(newUser)
    const id: string = userCreated.value?.user[0].id.toString()

    await sut.execute(id)

    expect(inMemoryUsersRepository.items.length).toEqual(0)
  })

  it('should be able to delte not found a user', async () => {
    const newUser = makeUsers()
    await createUsersUseCase.execute(newUser)
    
    const result = await sut.execute('user-test-1')

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
