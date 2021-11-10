const express = require('express');
const candidates = require('./controllers/candidates');
<<<<<<< HEAD
const openPositions = require('./controllers/open-positions');
=======
const profileTypes = require('./controllers/profile-types');
const psychologists = require('./controllers/psychologists');
const administrators = require('./controllers/administrators');
const applications = require('./controllers/applications');
const companies = require('./controllers/companies');
const sessions = require('./controllers/sessions');
const interviews = require('./controllers/interviews');
>>>>>>> development

const app = express();
const port = 8000;

<<<<<<< HEAD
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
=======
app.get("/", (req, res) => {
	let html = "<h1>MindSet</h1>";
	html += "<ul>";
	html += "  <li><h2>Companies:</h2>";
	html += "    <ul>";
	html += '      <li><a href="/companies">getAll</a></li>';
	html += '      <li><a href="/company/1">getById</a></li>';
	html += '      <li><a href="/company/byName/pepsi">getByName</a></li>';
	html += '      <li><a href="/company/add">add</a></li>';
	html += '      <li><a href="/company/edit/1">edit</a></li>';
	html += '      <li><a href="/company/remove/100">remove</a></li>';
	html += "    </ul>";
	html += "  </li>";
	html += "  <li><h2>Candidates:</h2>";
	html += "    <ul>";
	html += '      <li><a href="/candidates">getAll</a></li>';
	html += '      <li><a href="/candidate/1">getById</a></li>';
	html += '      <li><a href="/candidate/byName/john">getByName</a></li>';
	html += '      <li><a href="/candidate/add">add</a></li>';
	html += '      <li><a href="/candidate/edit/1">edit</a></li>';
	html += '      <li><a href="/candidate/remove/100">remove</a></li>';
	html += "    </ul>";
	html += "  </li>";
	html += "  <li><h2>Applications:</h2>";
	html += "    <ul>";
	html += '      <li><a href="/applications">getAll</a></li>';
	html += '      <li><a href="/applications/byPos/7">getByOpenPosition</a></li>';
	html += '      <li><a href="/applications/byCan/8">getByCandidate</a></li>';
	html += '      <li><a href="/applications/add">add</a></li>';
	html += '      <li><a href="/applications/edit/7">edit</a></li>';
	html += '      <li><a href="/applications/remove/5">remove</a></li>';
	html += '      <li><a href="/applications/1">getById</a></li>';
	html += "    </ul>";
	html += "  </li>";
	html += "  <li><h2>Administrators:</h2>";
	html += "    <ul>";
	html += '      <li><a href="/administrators">getAll</a></li>';
	html += '      <li><a href="/administrator/1">getById</a></li>';
	html += '      <li><a href="/administrator/byName/Minerva">getByName</a></li>';
	html += '      <li><a href="/administrator/add">add</a></li>';
	html += '      <li><a href="/administrator/edit/2">edit</a></li>';
	html += '      <li><a href="/administrator/remove/3">remove</a></li>';
	html += "    </ul>";
	html += "  </li>";
	html += "  <li><h2>Psychologists:</h2>";
	html += "    <ul>";
	html += '      <li><a href="/psychologists">getAll</a></li>';
	html += '      <li><a href="/psychologists/1">getById</a></li>';
	html += '      <li><a href="/psychologists/byName?firstName=Mirvin&lastName=Dowdeswell">getByName</a></li>';
	html += '      <li><a href="/psychologists/add">add</a></li>';
	html += '      <li><a href="/psychologists/edit/1">edit</a></li>';
	html += '      <li><a href="/psychologists/remove/2">remove</a></li>';
	html += "    </ul>";
	html += "  </li>";
  html += '  <li><h2>Sessions:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/sessions">getAll</a></li>';
  html += '      <li><a href="/session/1">getById</a></li>';
  html += '      <li><a href="/session/byIdCandidate/15">getByIdCandidate</a></li>';
  html += '      <li><a href="/session/add?id=215&idPsychologists=215&idCandidate=215&date=11/23/2021&time=14:30&isActive=true">add</a></li>';
  html += '      <li><a href="/session/edit/50">edit</a></li>';
  html += '      <li><a href="/session/remove/40">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Profile-Types:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/profile-types">getAll</a></li>';
  html += '      <li><a href="/profile-types/byName/administrative">getByName</a></li>';
  html += '      <li><a href="/profile-types/add">add</a></li>';
  html += '      <li><a href="/profile-types/edit/1">edit</a></li>';
  html += '      <li><a href="/profile-types/remove/2">remove</a></li>';
  html += '      <li><a href="/profile-types/1">getById</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Interviews:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/interviews">getAll</a></li>';
  html += '      <li><a href="/interviews/130">getById</a></li>';
  html += '      <li><a href="/interviews/byCompany/4">getByCompany</a></li>';  // change it from getByName
  html += '      <li><a href="/interviews/add">add</a></li>';
  html += '      <li><a href="/interviews/edit/130">edit</a></li>';
  html += '      <li><a href="/interviews/remove/130">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
	html += "</ul>";
	res.send(html);
>>>>>>> development
});

app.get("/candidates", candidates.getAll);
app.get("/candidate/add", candidates.add);
app.get("/candidate/:id", candidates.getById);
app.get("/candidate/byName/:name", candidates.getByName);
app.get("/candidate/edit/:id", candidates.edit);
app.get("/candidate/remove/:id", candidates.remove);

app.get("/companies", companies.getAll);
app.get("/company/byName/:name", companies.getByName);
app.get("/company/add", companies.add);
app.get("/company/:id", companies.getById);
app.get("/company/edit/:id", companies.edit);
app.get("/company/remove/:id", companies.remove);

app.get("/applications", applications.getAll);
app.get("/applications/byPos/:id", applications.getByPosition);
app.get("/applications/byCan/:id", applications.getByCandidate);
app.get("/applications/add", applications.add);
app.get("/applications/edit/:id", applications.edit);
app.get("/applications/remove/:id", applications.remove);
app.get("/applications/:id", applications.getById);

app.get("/administrators", administrators.getAll);
app.get("/administrator/byName/:name", administrators.getByName);
app.get("/administrator/add", administrators.add);
app.get("/administrator/edit/:id", administrators.edit);
app.get("/administrator/remove/:id", administrators.remove);
app.get("/administrator/:id", administrators.getById);

app.get("/psychologists", psychologists.getAll);
app.get("/psychologists/add", psychologists.add);
app.get("/psychologists/edit/:id", psychologists.edit);
app.get("/psychologists/remove/:id", psychologists.remove);
app.get("/psychologists/byName", psychologists.getByName);
app.get("/psychologists/:id", psychologists.getById);

app.get('/sessions', sessions.getAll);
app.get('/session/add', sessions.add);
app.get('/session/:id', sessions.getById);
app.get('/session/byIdCandidate/:id', sessions.getByIdCandidate);
app.get('/session/edit/:id', sessions.edit);
app.get('/session/remove/:id', sessions.remove);

app.get('/profile-types', profileTypes.getAll);
app.get('/profile-types/byName/:name', profileTypes.getByName);
app.get('/profile-types/add', profileTypes.add);
app.get('/profile-types/edit/:id', profileTypes.edit);
app.get('/profile-types/remove/:id', profileTypes.remove);
app.get('/profile-types/:id', profileTypes.getById);

//----INTERVIEWS----
app.get('/interviews', interviews.getAll);
app.get('/interviews/add', interviews.add);
app.get('/interviews/:id', interviews.getById);
app.get('/interviews/byCompany/:idCompany', interviews.getByCompany);
app.get('/interviews/edit/:id', interviews.edit);
app.get('/interviews/remove/:id', interviews.remove);

app.get('/open-positions', openPositions.getAll);
app.get('/open-positions/add', openPositions.add);
app.get('/open-positions/edit/:id', openPositions.edit);
app.get('/open-positions/remove/:id', openPositions.remove);
app.get('/open-positions/idCompany/:idCompany', openPositions.getByIdCompany);
app.get('/open-positions/:id', openPositions.getById); 

app.listen(port, () => {
	console.log(`Open your browser in http://localhost:${port}`);
});
