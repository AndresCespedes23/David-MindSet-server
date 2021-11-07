const express = require('express');
const candidates = require('./controllers/candidates');
const profileTypes = require('./controllers/profile-types');
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

app.get('/profile-types', profileTypes.getAll);
app.get('/profile-types/byName/:name', profileTypes.getByName);
app.get('/profile-types/add', profileTypes.add);
app.get('/profile-types/edit/:id', profileTypes.edit);
app.get('/profile-types/remove/:id', profileTypes.remove);
app.get('/profile-types/:id', profileTypes.getById);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
