const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    quatity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // userId
    // productId
});

module.exports = Cart;