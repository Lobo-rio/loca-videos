import { User } from '@/domain/movie-stores/enterprise/entities/users/users'
import { UsersRepository } from '@/domain/movie-stores/application/repositories/users/users-repository'
import { CreateUsersUseCase } from './create-user-usecase'

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
