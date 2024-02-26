import { Pet, Prisma } from '@prisma/client'

export interface ListPetParams {
  age?: string
  size?: string
}
export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  list(city: string, params?: ListPetParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
