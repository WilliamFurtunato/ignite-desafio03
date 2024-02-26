import { CreateOrgUseCase } from '../create-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(orgsRepository)

  return createOrgUseCase
}
