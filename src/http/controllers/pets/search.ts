import { makeListPetUseCase } from '@/use-cases/factories/make-list-pet-usercase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size } = querySchema.parse(request.query)

  const searchPetsUseCase = makeListPetUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
