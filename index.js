const express = require('express');
const sessions = require('./controllers/sessions');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    let html = '<h1>MindeSet</h1>';
    html += '<ul>';
    html += '  <li>sessions:';
    html += '    <ul>';
    html += '      <li><a href="/sessions">getAll</a></li>';
    html += '    </ul>';
    html += '  </li>';
    html += '</ul>';
    res.send();
});

app.get('/sessions', sessions.getAll);
app.get('/sessions/:id', sessions.getById);
app.get('/sessions/byName/:name', sessions.getByName);
app.get('/sessions/add', sessions.add);
app.get('/sessions/edit', sessions.edit);
app.get('/sessions/remove', sessions.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
