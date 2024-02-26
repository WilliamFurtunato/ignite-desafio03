import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create pet', async () => {
    const org = await orgsRepository.create({
      id: 'org-01',
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    const { pet } = await sut.execute({
      name: 'Pet',
      about: 'Good boy',
      age: '1',
      size: 'small',
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create with wrong org id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pet',
        about: 'Good boy',
        age: '1',
        size: 'small',
        org_id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
