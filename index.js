const express = require('express');
const applications = require('./controllers/applications');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>applications:';
    html += '    <ul>';
    html += '      <li><a href="/applications">getAll</a></li>';
    html += '    </ul>';
    html += '  </li>';
    html += '</ul>';
    res.send();
});

app.get('/applications', applications.getAll);
app.get('/applications/:id', applications.getById);
app.get('/applications/byName/:name', applications.getByName);
app.get('/applications/add', applications.add);
app.get('/applications/edit', applications.edit);
app.get('/applications/remove', applications.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
