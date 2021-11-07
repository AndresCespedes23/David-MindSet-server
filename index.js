const express = require('express');
const candidates = require('./controllers/candidates');
const openPositions = require('./controllers/open-positions');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>Open Positions:';
    html += '    <ul>';
    html += '      <li><a href="/open-positions">getAll</a></li>';
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

app.get('/open-positions', openPositions.getAll);
app.get('/open-positions/id/:id', openPositions.getById); 
app.get('/open-positions/idCompany/:idCompany', openPositions.getByIdCompany);
app.get('/open-positions/add', openPositions.add);
app.get('/open-positions/edit', openPositions.edit);
app.get('/open-positions/remove', openPositions.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
