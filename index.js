const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

/* MongoDB Atlas Connection */
mongoose.connect('mongodb+srv://userDavid:pswDavid@radiumcluster.ffqld.mongodb.net/mindset2021?retryWrites=true&w=majority', (err) => {
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
app.get("/candidates", candidates.getAll);
app.get("/candidate/add", candidates.add);
app.get("/candidate/:id", candidates.getById);
app.get("/candidate/byName/:name", candidates.getByName);
app.get("/candidate/edit/:id", candidates.edit);
app.get("/candidate/remove/:id", candidates.remove);

app.get("/companies", companies.getAll);
app.get("/company/byName/:name", companies.getByName);
app.get("/company/add", companies.add);
app.get("/company/:id", companies.getById);
app.get("/company/edit/:id", companies.edit);
app.get("/company/remove/:id", companies.remove);

app.get("/applications", applications.getAll);
app.get("/applications/byPos/:id", applications.getByPosition);
app.get("/applications/byCan/:id", applications.getByCandidate);
app.get("/applications/add", applications.add);
app.get("/applications/edit/:id", applications.edit);
app.get("/applications/remove/:id", applications.remove);
app.get("/applications/:id", applications.getById);

app.get("/administrators", administrators.getAll);
app.get("/administrator/byName/:name", administrators.getByName);
app.get("/administrator/add", administrators.add);
app.get("/administrator/edit/:id", administrators.edit);
app.get("/administrator/remove/:id", administrators.remove);
app.get("/administrator/:id", administrators.getById);

app.get('/sessions', sessions.getAll);
app.get('/session/add', sessions.add);
app.get('/session/:id', sessions.getById);
app.get('/session/byIdCandidate/:id', sessions.getByIdCandidate);
app.get('/session/edit/:id', sessions.edit);
app.get('/session/remove/:id', sessions.remove);

app.get('/profile-types', profileTypes.getAll);
app.get('/profile-types/byName/:name', profileTypes.getByName);
app.get('/profile-types/add', profileTypes.add);
app.get('/profile-types/edit/:id', profileTypes.edit);
app.get('/profile-types/remove/:id', profileTypes.remove);
app.get('/profile-types/:id', profileTypes.getById);

app.get('/interviews', interviews.getAll);
app.get('/interviews/add', interviews.add);
app.get('/interviews/:id', interviews.getById);
app.get('/interviews/byCompany/:idCompany', interviews.getByCompany);
app.get('/interviews/edit/:id', interviews.edit);
app.get('/interviews/remove/:id', interviews.remove);

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
