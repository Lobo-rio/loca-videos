import { CreateUsersUseCase } from './users-usecase'
import { UsersRepository } from '../../repositories/users/users-repository'
import { User } from '../../entities/users/users'

const fakeUserRepository: UsersRepository = {
  create: async (user: User) => {},
}

test('create user', async () => {
  const userCreate = new CreateUsersUseCase(fakeUserRepository)

  const result = await userCreate.execute({
    name: 'User Example',
    email: 'user-example@text.com',
    admin: true,
    sector: 'Cadastro',
  })

  expect(result.name).toEqual('User Example')
})
