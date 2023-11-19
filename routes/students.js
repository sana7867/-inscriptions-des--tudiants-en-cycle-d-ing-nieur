const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./students.db');

// Endpoint to add a student
router.post('/', (req, res) => {
  const { firstName, lastName, year, department } = req.body;

  db.run(`INSERT INTO students (firstName, lastName, year, department)
          VALUES (?, ?, ?, ?)`, [firstName, lastName, year, department], function(err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        // Chercher un étudiant avec le même firstName et lastName
        db.get("SELECT * FROM students WHERE firstName = ? AND lastName = ?", [firstName, lastName], (selectErr, row) => {
          if (selectErr) {
            res.status(500).json({ error: true, message: "Erreur lors de la récupération des informations de l'étudiant existant." });
          } else {
            if (row) {
              res.status(400).json({
                error: true,
                message: "Cet étudiant existe déjà.",
                student: row
              });
            } else {
              res.status(400).json({
                error: true,
                message: "Cet étudiant existe déjà, mais les informations détaillées ne sont pas disponibles."
              });
            }
          }
        });
      } else {
        res.status(500).json({ error: true, message: "Une erreur s'est produite lors de l'ajout de l'étudiant." });
      }
    } else {
      res.status(201).json({ error: false, message: "L'étudiant a été ajouté avec succès !", id: this.lastID });
    }
  });
});

router.get('/search', (req, res) => {
  const { firstName, lastName } = req.query;

  db.get("SELECT * FROM students WHERE firstName = ? AND lastName = ?", [firstName, lastName], (err, row) => {
    if (err) {
      res.status(500).json({ error: true, message: "Erreur lors de la recherche de l'étudiant." });
    } else {
      if (row) {
        res.status(200).json(row); // renvoie l'étudiant trouvé
      } else {
        res.status(404).json({ error: true, message: "Étudiant non trouvé." });
      }
    }
  });
});

router.post('/:studentId/quit', (req, res) => {
  const studentId = req.params.studentId;

  db.run(`UPDATE students SET quitter = 1 WHERE id = ?`, [studentId], function(err) {
    if (err) {
      res.status(500).json({ error: true, message: "Erreur lors de la mise à jour de l'étudiant." });
    } else {
      if (this.changes === 0) {
        res.status(404).json({ error: true, message: "Étudiant non trouvé." });
      } else {
        res.status(200).json({ error: false, message: "L'étudiant a été marqué comme ayant quitté." });
      }
    }
  });
});
router.get('/department', (req, res) => {
  const { department } = req.query;

  db.all("SELECT * FROM students WHERE department = ?", [department], (err, rows) => {
    if (err) {
      res.status(500).json({ error: true, message: "Erreur lors de la recherche des étudiants du département." });
    } else {
      res.status(200).json({ students: rows });
    }
  });
});
router.get('/year', (req, res) => {
  const { year } = req.query;

  db.all("SELECT * FROM students WHERE year = ?", [year], (err, rows) => {
    if (err) {
      res.status(500).json({ error: true, message: "Erreur lors de la recherche des étudiants pour l'année spécifiée." });
    } else {
      res.status(200).json({ students: rows });
    }
  });
});


module.exports = router;
