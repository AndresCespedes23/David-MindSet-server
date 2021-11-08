const express = require('express');
const candidates = require('./controllers/candidates');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li><h2>Candidates:</h2></li>';
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

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
