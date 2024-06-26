const request = require('supertest')
const app = require('../app')



const BASE_URL = '/api/v1/users'
let token

beforeAll(async()=>{
    const body = {
        email    : 'ton@gmail.com',
        password : '123456',
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)

    token = res.body.token

})


test('POST => BASE_URL should return status 201 and res.body.firstName === user.firstName', async() => {
    const user = {
        firstName: 'Tonatiuj',
        lastName : 'Sánchez',
        email    : 'tona@gmail.com',
        password : '123456',
        phone    : '1234567891',
    }
    
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)  
})

test('GET => BASE_URL should return status code 200, adn res.body.length === 1', async() => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
})