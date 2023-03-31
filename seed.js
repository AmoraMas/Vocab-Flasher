const { Pool } = require("pg");
const connDB = require("./connDB");
const pool = connDB.getPool();

// establish a connection we can close with a callback
async function runSeed(pool, callback) {
  // connect to DB
  await new Promise((resolve, reject) =>
    pool.connect((err, client, done) => {
      if (err) {
        console.log("Failed to connect to the database");
        console.error(err);
        return done();
      }
      resolve();
    })
  );

  let insert = false;

  await new Promise((resolve, reject) =>
    pool.query(`SELECT COUNT(*) FROM flashcards`, (err, data) => {
      console.log("number of existing rows: ", data.rows[0]["count"]);
      if (data.rows[0]["count"] == 0) {
        insert = true;
      }
      resolve();
    })
  );
  console.log("insert: ", insert);
  // only INSERT new rows if the table is currently empty
  if (insert) {
    await new Promise((resolve, reject) =>
      pool.query(
        `INSERT INTO flashcards (category, question, answer, attempts) VALUES 
          ('OOP', 'Objects', 'Data type that holds key:value pairs. Values can be anything, including a function or another object.', 0),
          ('OOP', 'State', 'The current status of an object. All declared key:value pairs in an object.', 0),
          ('OOP', 'Behavior', 'The functions within an object that change the current state of the object.', 0),
          ('JS Data Types', 'Array', 'A list of items surrounded by square barackets and seperated by commas.', 0),
          ('JS Data Types', 'String', 'A series of characters or numbers surrounded by quotes.', 0),
          ('JS Data Types', 'Number', 'A number with or without anything after the decimal. Integer, Float.', 0),
          ('JS Data Types', 'Object', 'holds key:value pairs. Values can be anything, including a function or another object.', 0)`,
        (err, data) => {
          if (err) {
            console.log("INSERT INTO flashcards failed");
            console.log(err);
            reject();
          } else {
            console.log("INSERT INTO flashcards successful");
            resolve();
          }
        }
      )
    );
  } else {
    console.log(
      "Did not seed new data because the table flashcards was not empty"
    );
  }
  console.log("Ended");
  callback();
}

runSeed(pool, () => {
  pool.end();
  console.log("Ended");
});
