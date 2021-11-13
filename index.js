const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

/* MongoDB Atlas Connection */
// 'mongodb+srv://userDavid:pswDavid@radiumcluster.ffqld.mongodb.net/mindset2021?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://radium:radium123456@cluster0.urj6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err) => {
  if (err) {
    console.log('error connecting database');
  } else {
    console.log('data base connected');
  }
});

app.use(express.json());
app.use(cors());

app.use('/api', routes);

/* Copiar segun el recurso, los métodos y cambiar los get por lo que corresponda en cada route
Para probar los métodos que no son get, se debe usar Postman
Usar el ejemplo de psychologist */

/*
app.get('/interviews', interviews.getAll);
app.get('/interviews/add', interviews.add);
app.get('/interviews/:id', interviews.getById);
app.get('/interviews/byCompany/:idCompany', interviews.getByCompany);
app.get('/interviews/edit/:id', interviews.edit);
app.get('/interviews/remove/:id', interviews.remove);
*/
app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
