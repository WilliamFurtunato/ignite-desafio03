import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetUseCase } from '../list-pets'

export function makeListPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createPetsUseCase = new ListPetUseCase(petsRepository)

  return createPetsUseCase
}
