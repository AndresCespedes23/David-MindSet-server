const express = require('express');

const candidates = require('./controllers/candidates');
const applications = require('./controllers/applications');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>Candidates:';
    html += '    <ul>';
    html += '      <li><a href="/candidates">getAll</a></li>';
    html += '      <li><a href="/candidate/:id">getById</a></li>';
    html += '      <li><a href="/candidate/byName/:name">getByName</a></li>';
    html += '      <li><a href="/candidate/add">add</a></li>';
    html += '      <li><a href="/candidate/edit/:id">edit</a></li>';
    html += '      <li><a href="/candidate/remove/:id">remove</a></li>';
    html += '    </ul>';
    html += '  </li>';
    html += '</ul>';
    html += '<ul>';
    html += '  <li>applications:';
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
    html += '</ul>';
    res.send(html);
});


app.get('/candidates', candidates.getAll);
app.get('/candidates/byName/:name', candidates.getByName);
app.get('/candidates/add', candidates.add);
app.get('/candidates/edit', candidates.edit);
app.get('/candidates/remove', candidates.remove);
app.get('/candidates/:id', candidates.getById);


app.get('/applications', applications.getAll);
app.get('/applications/byPos/:id', applications.getByPosition);
app.get('/applications/byCan/:id', applications.getByCandidate);
app.get('/applications/add', applications.add);
app.get('/applications/edit/:id', applications.edit);
app.get('/applications/remove/:id', applications.remove);
app.get('/applications/:id', applications.getById);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
