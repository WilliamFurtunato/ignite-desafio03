import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-usecase'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string().length(2),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    whatsapp: z.string(),
  })

  const {
    name,
    email,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    whatsapp,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateOrgUseCase()

    await registerUseCase.execute({
      name,
      email,
      pass: password,
      cep,
      state,
      city,
      neighborhood,
      street,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
