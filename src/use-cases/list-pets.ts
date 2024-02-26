import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ListPetUseCaseRequest {
  city: string
  age?: string
  size?: string
}

interface ListPetUseCaseResponse {
  pets: Pet[]
}

export class ListPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
  }: ListPetUseCaseRequest): Promise<ListPetUseCaseResponse> {
    const pets = await this.petsRepository.list(city, {
      age,
      size,
    })

    return { pets }
  }
}
