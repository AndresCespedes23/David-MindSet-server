const express = require('express');

const postulants = require('./controllers/postulants');
const applications = require('./controllers/applications');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>applications:';
    html += '    <ul>';
    html += '      <li><a href="/applications">getAll</a></li>';
    html += '    </ul>';
    html += '  </li>';
    html += '</ul>';
    res.send();
});


app.get('/postulants', postulants.getAll);
app.get('/postulants/byName/:name', postulants.getByName);
app.get('/postulants/add', postulants.add);
app.get('/postulants/edit', postulants.edit);
app.get('/postulants/remove', postulants.remove);
app.get('/postulants/:id', postulants.getById);


app.get('/applications', applications.getAll);
app.get('/applications/byPos/:id', applications.getByIdPos);
app.get('/applications/byCan/:id', applications.getByIdCan);
app.get('/applications/add', applications.add);
app.get('/applications/edit', applications.edit);
app.get('/applications/remove', applications.remove);
app.get('/applications/:id', applications.getById);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
