require('../models')
const sequelize = require('../utils/connection');
const { createUser } = require('./createData/user');

const testMigrate = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("DB reset exit");
        await createUser()
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate();