import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create Org (e2)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe@email.com',
      password: '123456',
      cep: '05653-070',
      city: 'São Paulo',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    expect(response.statusCode).toEqual(201)
  })
})
