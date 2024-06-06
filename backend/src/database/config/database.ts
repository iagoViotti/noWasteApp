import { createPool, Pool } from 'mysql2';

const pool: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;