const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./students.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL UNIQUE,
      year INTEGER CHECK(year IN (1,2,3)),
      department TEXT NOT NULL
    )
  `);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
