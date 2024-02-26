import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { get } from './get'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/orgs/pets', search)
  app.get('/orgs/pets/:id', get)

  // Authenticated
  app.post('/orgs/pets', { onRequest: [verifyJWT] }, create)
}
