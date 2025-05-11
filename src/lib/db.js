import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Sesuaikan sesuai kebutuhan
  queueLimit: 0,
});

export async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Error getting database connection:', error);
    throw error;
  }
}

export async function executeQuery(query, params = []) {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, params);
    connection.release();
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}