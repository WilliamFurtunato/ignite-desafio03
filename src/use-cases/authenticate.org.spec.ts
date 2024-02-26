import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from './authenticate-org'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    const { org } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
