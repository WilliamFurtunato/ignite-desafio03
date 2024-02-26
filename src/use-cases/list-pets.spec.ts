import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ListPetUseCase } from './list-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: ListPetUseCase

describe('List Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new ListPetUseCase(petsRepository)
  })

  it('should be able to list pets from specific City', async () => {
    const { id } = await orgsRepository.create({
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
    await petsRepository.create({
      name: 'Dog',
      about: 'Good boy',
      age: '1',
      size: 'small',
      org_id: id,
    })
    await petsRepository.create({
      name: 'Cat',
      about: 'Good cat',
      age: '1',
      size: 'small',
      org_id: id,
    })

    const { pets } = await sut.execute({
      city: 'city 1',
    })

    expect(pets).toHaveLength(2)
  })
})
