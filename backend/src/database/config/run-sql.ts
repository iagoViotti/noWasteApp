import * as fs from 'fs';
// import * as path from 'path';
// import connection from './database';
import { createPool } from 'mysql2';

async function createConnection() {
  return createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  });
}

async function runSQLFile(filePath: string) {
  const pool = await createConnection();
  const sql = fs.readFileSync(filePath, 'utf8');
  const statements = sql.split(';').map(stmt => stmt.trim()).filter(stmt => stmt);

  for (let statement of statements) {
    if (statement) {
      console.log(`Executing: ${statement}`);
      await pool.promise().query(statement);
    }
  }
  await pool.promise().end();
}

const filePath = process.argv[2];

if (filePath) {
  runSQLFile(filePath).catch(err => {
    console.error(`Error executing ${filePath}:`, err);
  })
} else {
  console.log('Please provide the path to the SQL file');
}
