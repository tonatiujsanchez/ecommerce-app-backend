require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')


const BASE_URL = '/api/v1/products'
const BASE_URL_AUTH = '/api/v1/users/login'
let token, category, product, productId


beforeAll(async()=>{
    const body = {
        email    : 'ton@gmail.com',
        password : '123456',
    }
    const res = await request(app)
        .post(BASE_URL_AUTH)
        .send(body)

    token = res.body.token


    category = await Category.create({
        name: 'Clothes'
    })

    product = {
        title: 'Shirt',
        description: 'Basic shirt of color black',
        price: 200,
        categoryId: category.id
    }
})


afterAll(async()=>{
    await category.destroy()
})


test('POST => BASE_URL should return statusCode 201, res.body.title === product.title and res.body.categoryId === category.id', async() => {

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${token}`)
    
    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)

})


test('GET => BASE_URL should return statusCode 200 and res.body to have length 1 ', async() => {
    
    const res = await request(app)
        .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test('GET => BASE_URL/:id should return statusCode 200 and res.body.name === produc.name ', async() => {
    
    const res = await request(app)
        .get(`${BASE_URL}/${ productId }`)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect( res.body.title ).toBe( product.title )
})

test('PUT => BASE_URL/:id should return statusCode 200 and res.body.title === productUpdate.title', async() => {
   
    const productUpdate = {
        title: 'Pants',
        description: 'Basic pants blue',
        price: 250
    }

    const res = await request(app)
        .put(`${BASE_URL}/${ productId }`)
        .send(productUpdate)
        .set('Authorization', `Bearer ${token}`)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe( productUpdate.title )
})

test('DELETE => BASE_URL/:id should return statusCode 204', async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${ productId }`)
        .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(204)
    
})