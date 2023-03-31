const { Pool } = require("pg");
const connDB = require("./connDB");
const pool = connDB.getPool();

// connect to DB
pool.connect((err, client, done) => {
  if (err) {
    console.log("Failed to connect to the database");
    console.error(err);
    return done();
  }
});

// establish a connection we can close with a callback
async function runMigration() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS flashcards (
        id SERIAL PRIMARY KEY NOT NULL,
        category VARCHAR(100) NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        attempts INTEGER DEFAULT 0)`,
    (err, data) => {
      if (err) {
        console.log("CREATE TABLE flashcards failed");
      } else {
        console.log("CREATE TABLE flashcards sucessful");
      }
    }
  );
  pool.end();
}

runMigration();
