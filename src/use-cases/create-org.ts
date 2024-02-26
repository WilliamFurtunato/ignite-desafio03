import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgUseCaseRequest {
  email: string
  name: string
  whatsapp: string
  pass: string
  cep: string
  city: string
  neighborhood: string
  state: string
  street: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    whatsapp,
    pass,
    cep,
    city,
    neighborhood,
    state,
    street,
    email,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password = await hash(pass, 6)
    const org = await this.orgsRepository.create({
      name,
      whatsapp,
      email,
      password,
      cep,
      city,
      neighborhood,
      state,
      street,
    })

    return { org }
  }
}
