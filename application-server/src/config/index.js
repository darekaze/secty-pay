const path = require('path');

module.exports = {
  port: process.env.PORT || 8083,
  db: {
    database: process.env.DB_NAME || 'secApp',
    user: process.env.DB_USER || 'secApp',
    password: process.env.DB_PASS || 'secApp_secret',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      operatorsAliases: false,
      storage: path.resolve(__dirname, '../../secApp.sqlite'), // For SQLite
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secApp_secret',
  },
};
