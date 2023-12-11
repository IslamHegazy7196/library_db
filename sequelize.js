const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', 
  username: 'postgres', 
  password: '696969', 
  database: 'bostalib_db', 
});

module.exports = sequelize;
