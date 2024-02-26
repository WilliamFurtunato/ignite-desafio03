import { randomUUID } from 'crypto'
import { ListPetParams, PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      about: data.about,
      age: data.age,
      name: data.name,
      org_id: data.org_id,
      size: data.size,
    }

    this.items.push(pet)

    return pet
  }

  async list(city: string, params?: ListPetParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params?.age ? item.age === params.age : true))
      .filter((item) => (params?.size ? item.size === params.size : true))

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
