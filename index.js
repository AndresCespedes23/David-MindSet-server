const express = require('express');
const candidates = require('./controllers/candidates');
const administrators = require('./controllers/administrators');


const app = express();
const port = 8000;

app.get('/', (req, res) => {
  let html = '<h1>MindeSet</h1>';
  html += '<ul>';
  html += '  <li>Candidates:';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li>Administrators:';
  html += '    <ul>';
  html += '      <li><a href="/administrators">getAll</a></li>';
  html += '      <li><a href="/administrator/1">getById</a></li>';
  html += '      <li><a href="/administrator/byName/Minerva">getByName</a></li>';
  html += '      <li><a href="/administrator/add">add</a></li>';
  html += '      <li><a href="/administrator/edit/2">edit</a></li>';
  html += '      <li><a href="/administrator/remove/3">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '</ul>';
  res.send(html);
});

app.get('/candidates', candidates.getAll);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/add', candidates.add);
app.get('/candidate/edit', candidates.edit);
app.get('/candidate/remove', candidates.remove);

app.get('/administrators', administrators.getAll);
app.get('/administrator/byName/:name', administrators.getByName);
app.get('/administrator/add', administrators.add);
app.get('/administrator/edit/:id', administrators.edit);
app.get('/administrator/remove/:id', administrators.remove);
app.get('/administrator/:id', administrators.getById);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});