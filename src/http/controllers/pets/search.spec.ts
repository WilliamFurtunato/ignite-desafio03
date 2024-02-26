import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456',
    })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Pet',
        about: 'Good boy',
        age: '1',
        size: 'small',
      })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Cat',
        about: 'Good cat',
        age: '1',
        size: 'small',
      })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: 'São Paulo' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and all filters', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      whatsapp: '11900000000',
      email: 'johndoe2@email.com',
      password: '123456',
      cep: '05653-070',
      city: 'rio de janeiro',
      neighborhood: 'Morumbi',
      state: 'SP',
      street: 'Praça Roberto Gomes Pedrosa, 1',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe2@email.com',
      password: '123456',
    })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Bidu',
        about: 'Good boy',
        age: '1',
        size: 'small',
      })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send({
        name: 'Bilu',
        about: 'Good cat',
        age: '2',
        size: 'small',
      })

    let response = await request(app.server).get('/orgs/pets').query({
      city: 'rio de janeiro',
    })
    console.log('response 1')
    console.log(response.body.pets)

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/orgs/pets').query({
      city: 'rio de janeiro',
      age: '2',
    })

    console.log('response 2')
    console.log(response.body.pets)

    expect(response.body.pets).toHaveLength(1)
  })
})
