const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

/* MongoDB Atlas Connection */
mongoose.connect(
  'mongodb+srv://radium:radium123456@cluster0.urj6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (err) => {
    if (err) {
      console.log('error connecting database');
    } else {
      console.log('data base connected');
    }
  },
);

app.use(express.json());
app.use(cors());

app.use('/api', routes);

/* Copiar segun el recurso, los métodos y cambiar los get por lo que corresponda en cada route
Para probar los métodos que no son get, se debe usar Postman
Usar el ejemplo de psychologist */

/*
app.get('/open-positions', openPositions.getAll);
app.get('/open-positions/add', openPositions.add);
app.get('/open-positions/edit/:id', openPositions.edit);
app.get('/open-positions/remove/:id', openPositions.remove);
app.get('/open-positions/byIdCompany/:idCompany', openPositions.getByIdCompany);
app.get('/open-positions/:id', openPositions.getById);
*/

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
