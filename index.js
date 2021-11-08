const express = require('express');
const candidates = require('./controllers/candidates');
const openPositions = require('./controllers/open-positions');

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
  html += '  <li>Open positions:';
  html += '    <ul>';
  html += '      <li><a href="/open-positions">getAll</a></li>';
  html += '      <li><a href="/open-positions/5">getById</a></li>';
  html += '      <li><a href="/open-positions/getByIdCompany/12">getByIdCompany</a></li>';
  html += '      <li><a href="/open-positions/add">add</a></li>';
  html += '      <li><a href="/open-positions/edit/6">edit</a></li>';
  html += '      <li><a href="/open-positions/remove/4">remove</a></li>';
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

app.get('/open-positions', openPositions.getAll);
app.get('/open-positions/add', openPositions.add);
app.get('/open-positions/edit/:id', openPositions.edit);
app.get('/open-positions/remove/:id', openPositions.remove);
app.get('/open-positions/idCompany/:idCompany', openPositions.getByIdCompany);
app.get('/open-positions/:id', openPositions.getById); 

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
