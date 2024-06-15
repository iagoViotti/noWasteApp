import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
  user: 'root',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  host: 'database',
  port: 3306
}

const connection = mysql.createPool(access);

export default connection;