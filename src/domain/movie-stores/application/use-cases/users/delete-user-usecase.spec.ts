import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUsers } from 'test/factories/make-users'
import { DeleteUsersUseCase } from './delete-user-usecase'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUsersUseCase
let sut: DeleteUsersUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    sut = new DeleteUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to delte a user', async () => {
    const newUser = makeUsers()
    const userCreated = await createUsersUseCase.execute(newUser)
    const id: string = userCreated.user.id.toString()

    await sut.execute(id)

    expect(inMemoryUsersRepository.items.length).toEqual(0)
  })
})
