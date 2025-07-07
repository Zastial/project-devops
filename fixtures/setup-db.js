const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'motdepassefort',
  database: 'devops_tp',
  connectionLimit: 5
});

async function setup() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`CREATE TABLE IF NOT EXISTS submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL ,
      email VARCHAR(255) NOT NULL UNIQUE
    )`);
    const users = [
      ['Alice', 'alice@mail.com'],
      ['Bob', 'bob@mail.com'],
      ['Charlie', 'charlie@mail.com']
    ];

    for (const [name, email] of users) {
      await conn.query(
        'INSERT INTO submissions (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email)',
        [name, email]
      );
    }
    console.log('Table créée et utilisateurs insérés.');
  } catch (err) {
    console.error('Erreur lors de la préparation de la base :', err);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

setup();