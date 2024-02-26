import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      whatsapp: data.whatsapp,
      password: data.password,
      cep: data.cep,
      city: data.city,
      neighborhood: data.neighborhood,
      state: data.state,
      street: data.street,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
