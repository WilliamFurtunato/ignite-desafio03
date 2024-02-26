import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      pass: '123456',
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create org with same email twice', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'John Doe',
      whatsapp: '11900000000',
      email,
      pass: '123456',
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        whatsapp: '11900000000',
        email,
        pass: '123456',
        cep: '05653-070',
        city: 'São Paulo',
        neighborhood: 'Morumbi',
        state: 'SP',
        street: 'Praça Roberto Gomes Pedrosa, 1',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      pass: '123456',
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
