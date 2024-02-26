import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createPetsUseCase = new GetPetUseCase(petsRepository)

  return createPetsUseCase
}
