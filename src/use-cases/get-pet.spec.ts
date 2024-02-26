import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able get pet', async () => {
    const org = await orgsRepository.create({
      id: 'org-01',
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'org1@email.com',
      password: '123456',
      cep: '05653-070',
      city: 'city 1',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })
    const pet = await petsRepository.create({
      name: 'Dog',
      about: 'Good boy',
      age: '1',
      size: 'small',
      org_id: org.id,
    })

    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to list pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
