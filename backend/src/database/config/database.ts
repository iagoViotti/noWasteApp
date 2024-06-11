// import { createPool, Pool } from 'mysql2';

// const pool: Pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// export default pool;

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