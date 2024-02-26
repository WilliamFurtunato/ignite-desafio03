import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ListPetUseCaseRequest {
  city: string
}

interface ListPetUseCaseResponse {
  pets: Pet[]
}

export class ListPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {
    const pets = await this.petsRepository.list(city)

    return { pets }
  }
}
