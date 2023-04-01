// define dependencies
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000; // Port that Express listens to for requests

app.use(cors());

app.use(express.json());

// define structure for accessing database
//const { Pool } = require('pg');
const connDB = require("./connDB");
const pool = connDB.getPool();

// listen to the port
app.listen(port, function () {
  console.log(`Server is listening on port ${port}.`);
});

//
// here is where all of your requests with routes go
//

// test request to verify this file is working
app.get("/api/test", (req, res, next) => {
  res.send("Programming is awesome! This page works!");
});

// ROUTES FOR EVERYTHING IN TABLE
// return all entries for table flashcards
app.get("/api/flashcards", (req, res, next) => {
  const result = pool.query("SELECT * FROM flashcards;", (err, data) => {
    if (err) {
      return next({ status: 500, message: err });
    }
    res.send(data.rows);
  });
});

// return all categories within table flashcards
app.get("/api/flashcards/categories", (req, res, next) => {
  const result = pool.query(
    "SELECT DISTINCT category FROM flashcards ORDER BY category;",
    (err, data) => {
      if (err) {
        return next({ status: 500, message: err });
      }
      let categoryList = [];
      for (let i = 0; i < data.rows.length; i++) {
        categoryList.push(data.rows[i].category);
      }
      res.send(categoryList);
    }
  );
});

// return all entries for table flashcards where attempts < id
app.get("/api/flashcards/:id", (req, res, next) => {
  let id = parseInt(req.params.id);
  const result = pool.query(
    "SELECT * FROM flashcards WHERE attempts < $1;",
    [id],
    (err, data) => {
      if (err) {
        return next({ status: 500, message: err });
      }
      res.send(data.rows);
    }
  );
});

// return all entries for table flashcards where attempts < id for a category
app.get("/api/flashcards/:category/:id", (req, res, next) => {
  const category = req.params.category;
  const id = parseInt(req.params.id);
  const result = pool.query(
    "SELECT * FROM flashcards WHERE category = $1 AND attempts < $2;",
    [category, id],
    (err, data) => {
      if (err) {
        return next({ status: 500, message: err });
      }
      res.send(data.rows);
    }
  );
});

// Adds new rows to flashcards
app.post("/api/flashcards", (req, res, next) => {
  const { category, question, answer } = req.body;
  if (!category || !question || !answer) {
    return next({
      status: 400,
      message: `Submitted information was incorrect.`,
    });
  }
  const result = pool.query(
    `INSERT INTO flashcards (category, question, answer) VALUES ($1, $2, $3) RETURNING *;`,
    [category, question, answer],
    (writeError, data) => {
      if (writeError) {
        return next({ status: 500, message: writeError });
      }
      res.send(data.rows[0]);
    }
  );
});

// Deletes a row of id from flashcards
app.delete("/api/flashcards/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Verify the ID exists
  const result = pool.query(
    `SELECT * FROM flashcards WHERE id = $1;`,
    [id],
    (readError, deletedData) => {
      if (readError) {
        return next({ status: 500, message: readError });
      } else if (deletedData.rowCount == 0) {
        return next({
          status: 404,
          message: `Flashcard ${id} does not exist.`,
        });
      }
      //delete the data
      const result = pool.query(
        `DELETE FROM flashcards WHERE id = $1 RETURNING *;`,
        [id],
        (writeError, data) => {
          if (writeError) {
            return next({ status: 500, message: writeError });
          }
          res.send(data.rows[0]);
        }
      );
    }
  );
});

// Patches a row from flashcards
app.patch("/api/flashcards/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  // Verify the ID exists
  const result = pool.query(
    `SELECT * FROM flashcards WHERE id = $1;`,
    [id],
    (readError, deletedData) => {
      if (readError) {
        return next({ status: 500, message: readError });
      } else if (deletedData.rowCount == 0) {
        return next({
          status: 404,
          message: `Flashcard ${id} does not exist.`,
        });
      }
      // Check if submitted body has good information
      const request = req.body;
      let list = ["category", "question", "answer", "attempts"];
      // Only has expected keys and expected integers are integers
      for (let key in request) {
        if (!list.includes(key)) {
          return next({
            status: 400,
            message: "Bad information provided. Key name. " + key,
          });
        } else if (key == "attempts" && isNaN(request[key])) {
          return next({
            status: 400,
            message: "Submitted attempts is not a number.",
          });
        }
      }
      // Perform the update for each key value requested
      for (let key in request) {
        let queryText =
          "UPDATE flashcards SET " + key + "=$1 WHERE id = $2 RETURNING *";
        const result = pool.query(
          queryText,
          [request[key], id],
          (writeError, data) => {
            if (writeError) {
              return next({ status: 500, message: writeError });
            }
            res.send(data.rows[0]);
          }
        );
      }
    }
  );
});

//
// TODO: Add PATCH route
//

//
// Below are standard routes -- leave alone
//

// if an error occured  -- Keep next to last
app.use((err, req, res, next) => {
  //console.error("Error Stack: ", err.stack);
  res.status(err.status).send({ error: err });
});

// if requested handle does not exist -- keep last
app.use((req, res, next) => {
  // res.status(404).send('Path Not Found: ${req.url}');   // Only sends message or JSON, not both
  res.status(404).json({ error: { message: `Path Not Found: ${req.url}` } });
});
