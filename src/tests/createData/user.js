const User = require('../../models/User')


const createUser = async() => {
    const body = {
        firstName: 'Tonatiuj',
        lastName : 'Sánchez',
        email    : 'ton@gmail.com',
        password : '123456',
        phone    : '1234567890',
    }
    
    await User.create(body)
}

module.exports = {
    createUser
}