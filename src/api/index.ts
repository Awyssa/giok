import { Elysia } from 'elysia'

const api = new Elysia()
    .get('/api', () => 'Hello Elysia')
    .get('/api/hello', () => ({ message: 'Hello from Elysia!', method: 'GET' }))
    .post('/api/hello', () => ({ message: 'Hello from Elysia!', method: 'POST' }))

export default api;