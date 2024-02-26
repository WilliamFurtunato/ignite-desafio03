import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
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
}
