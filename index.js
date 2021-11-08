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
    html += '<ul>';
    html += '  <li>Interviews:';
    html += '    <ul>';
    html += '      <li><a href="/interviews">getAll</a></li>';
    html += '      <li><a href="/interviews">getById</a></li>';
    html += '      <li><a href="/interviews">getByCompany</a></li>';  // change it from getByName
    html += '      <li><a href="/interviews">add</a></li>';
    html += '      <li><a href="/interviews">edit</a></li>';
    html += '      <li><a href="/interviews">remove</a></li>';
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

//----INTERVIEWS----
app.get('/interviews', interviews.getAll);
app.get('/interviews/add', interviews.add);
app.get('/interviews/:id', interviews.getById);
app.get('/interviews/byCompany/:idCompany', interviews.getByCompany);    // change it from getByName
app.get('/interviews/edit/:id', interviews.edit);         // add path /:id
app.get('/interviews/remove/:id', interviews.remove);      // add path /:id

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
