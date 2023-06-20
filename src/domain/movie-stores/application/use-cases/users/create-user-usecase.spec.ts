import { CreateUsersUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUsersUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUsersUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a user', async () => {
    const { user } = await sut.execute({
      name: 'User Example',
      email: 'user-example@text.com',
      admin: true,
      sector: 'Cadastro',
    })
  
    expect(user.name).toEqual('User Example')
  })
})


