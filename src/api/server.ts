import { Elysia } from 'elysia'

const api = new Elysia()
    .get('/', () => 'Hello Elysia')
    .get('/hello', () => ({ message: 'Hello from Elysia!', method: 'GET' }))
    .post('/hello', () => ({ message: 'Hello from Elysia!', method: 'POST' }))

export default api;