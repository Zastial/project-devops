const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'motdepassefort',
  database: 'devops_tp',
  connectionLimit: 5
});

async function initialize() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`CREATE TABLE IF NOT EXISTS submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )`);
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) conn.release();
  }
}

initialize();

module.exports = pool;
