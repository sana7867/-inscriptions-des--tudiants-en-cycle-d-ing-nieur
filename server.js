const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
