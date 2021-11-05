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
    html += '</ul>';
    res.send();
});

app.get('/', (req, res) => {
  let html = '<h1>MindeSet</h1>';
  html += '<ul>';
  html += '  <li>Administrators:';
  html += '    <ul>';
  html += '      <li><a href="/administrators">getAll</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '</ul>';
  res.send();
});

app.get('/candidates', candidates.getAll);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/add', candidates.add);
app.get('/candidate/edit', candidates.edit);
app.get('/candidate/remove', candidates.remove);

app.get('/administrators', administrators.getAll);
app.get('/administrators/:id', administrators.getById);
app.get('/administrators/byName/:name', administrators.getByName);
app.get('/administrators/add', administrators.add);
app.get('/administrators/edit', administrators.edit);
app.get('/administrators/remove', administrators.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
