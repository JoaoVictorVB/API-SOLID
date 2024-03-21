import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, it, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'




describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUseCase(prismaUsersRepository)





   const  { user } = await registerUserCase.execute({
      name:'john paranormal',
      email: 'paranormal@sempre.com',
      password: '123456',
    })

    const isPasswordCorrectyHashed = await compare(
      '123456',
      user.password_hash,
    )


    expect(isPasswordCorrectyHashed).toBe(true)
  })
})