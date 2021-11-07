const express = require('express');
const candidates = require('./controllers/candidates');
const interviews = require('./controllers/interviews');

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

app.get('/candidates', candidates.getAll);
app.get('/candidate/:id', candidates.getById);
app.get('/candidate/byName/:name', candidates.getByName);
app.get('/candidate/add', candidates.add);
app.get('/candidate/edit', candidates.edit);
app.get('/candidate/remove', candidates.remove);

app.get('/interviews', interviews.getAll);
app.get('/interviews/:id', interviews.getById);
app.get('/interviews/byName/:name', interviews.getByName);
app.get('/interviews/add', interviews.add);
app.get('/interviews/edit', interviews.edit);
app.get('/interviews/remove', interviews.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});