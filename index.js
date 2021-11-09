const express = require('express');

const candidates = require('./controllers/candidates');
const administrators = require('./controllers/administrators');
const applications = require('./controllers/applications');
const companies = require('./controllers/companies');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  let html = '<h1>MindSet</h1>';
  html += '<ul>';
  html += '  <li><h2>Companies:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/companies">getAll</a></li>';
  html += '      <li><a href="/company/1">getById</a></li>';
  html += '      <li><a href="/company/byName/pepsi">getByName</a></li>';
  html += '      <li><a href="/company/add">add</a></li>';
  html += '      <li><a href="/company/edit/1">edit</a></li>';
  html += '      <li><a href="/company/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Candidates:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '      <li><a href="/candidate/1">getById</a></li>';
  html += '      <li><a href="/candidate/byName/john">getByName</a></li>';
  html += '      <li><a href="/candidate/add">add</a></li>';
  html += '      <li><a href="/candidate/edit/1">edit</a></li>';
  html += '      <li><a href="/candidate/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Applications:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/applications">getAll</a></li>';
  html += '      <li><a href="/applications/byPos/7">getByOpenPosition</a></li>';
  html += '      <li><a href="/applications/byCan/8">getByCandidate</a></li>';
  html += '      <li><a href="/applications/add">add</a></li>';
  html += '      <li><a href="/applications/edit/7">edit</a></li>';
  html += '      <li><a href="/applications/remove/5">remove</a></li>';
  html += '      <li><a href="/applications/1">getById</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Administrators:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/administrators">getAll</a></li>';
  html += '      <li><a href="/administrator/1">getById</a></li>';
  html += '      <li><a href="/administrator/byName/Minerva">getByName</a></li>';
  html += '      <li><a href="/administrator/add">add</a></li>';
  html += '      <li><a href="/administrator/edit/2">edit</a></li>';
  html += '      <li><a href="/administrator/remove/3">remove</a></li>';
  html += '  </li>';
  html += '</ul>';
  res.send(html);
});


app.get('/candidates', candidates.getAll);
app.get('/candidate/add', candidates.add);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/edit/:id', candidates.edit);
app.get('/candidate/remove/:id', candidates.remove);

app.get('/companies', companies.getAll);
app.get('/company/byName/:name', companies.getByName);
app.get('/company/add', companies.add);
app.get('/company/:id', companies.getById);
app.get('/company/edit/:id', companies.edit);
app.get('/company/remove/:id', companies.remove);

app.get('/applications', applications.getAll);
app.get('/applications/byPos/:id', applications.getByPosition);
app.get('/applications/byCan/:id', applications.getByCandidate);
app.get('/applications/add', applications.add);
app.get('/applications/edit/:id', applications.edit);
app.get('/applications/remove/:id', applications.remove);
app.get('/applications/:id', applications.getById);

app.get('/administrators', administrators.getAll);
app.get('/administrator/byName/:name', administrators.getByName);
app.get('/administrator/add', administrators.add);
app.get('/administrator/edit/:id', administrators.edit);
app.get('/administrator/remove/:id', administrators.remove);
app.get('/administrator/:id', administrators.getById);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
