import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './session'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)
}
