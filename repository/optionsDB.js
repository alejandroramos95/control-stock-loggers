require('dotenv').config()

const options = {
    mysql: {
      client: 'mysql',
    connection: {
      host: process.env.HOSTMYQL,
      user: process.env.USERMYSQL,
      password: process.env.PASSWORDMYSQL,
      database: process.env.DATABASEMYSQL
    }
    }
  };
  
  module.exports = { options };