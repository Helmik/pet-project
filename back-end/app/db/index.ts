import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const dataBase = process.env.db_database || '';
const userName = process.env.db_username || '';
const password = process.env.db_password || '';
const host = process.env.db_host || '';
const port = parseInt(process.env.db_port || '3300');
const dialect = 'mysql';

console.log(`${host}:${port} - db: ${dataBase} - user: ${userName} - pwd: xxxx`)

const Database = new Sequelize({
  dialect: dialect,
  database: dataBase,
  username: userName,
  password: password,
  host: host,
  port: port,
  models: [__dirname + '/models/*']
});

export default Database;
