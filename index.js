const express = require('express');
const candidates = require('./controllers/candidates');
const sessions = require('./controllers/sessions');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  let html = '<h1>MindeSet</h1>';
  html += '<ul>';
  html += '  <li>Sessions:';
  html += '    <ul>';
  html += '      <li><a href="/sessions">getAll</a></li>';
  html += '      <li><a href="/session/1">getById</a></li>';
  html += '      <li><a href="/session/byIdCandidate/15">getByIdCandidate</a></li>';
  html += '      <li><a href="/session/add?id=215&idPsychologists=215&idCandidate=215&date=11/23/2021&time=14:30&isActive=true">add</a></li>';
  html += '      <li><a href="/session/edit/50">edit</a></li>';
  html += '      <li><a href="/session/remove/40">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li>Candidates:';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '      <li><a href="/candidates/1">getById</a></li>';
  html += '      <li><a href="/candidates/name/john">getByName</a></li>';
  html += '      <li><a href="/candidates/add">add</a></li>';
  html += '      <li><a href="/candidates/edit/1">edit</a></li>';
  html += '      <li><a href="/candidates/remove/100">remove</a></li>';
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

app.get('/sessions', sessions.getAll);
app.get('/session/add', sessions.add);
app.get('/session/:id', sessions.getById);
app.get('/session/byIdCandidate/:id', sessions.getByIdCandidate);
app.get('/session/edit/:id', sessions.edit);
app.get('/session/remove/:id', sessions.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
