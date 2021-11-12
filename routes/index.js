const express = require('express');
const psychologists = require('./psychologists');

const router = express.Router();

router.get('/', (req, res) => {
  let html = '<h1>MindSet</h1>';
  html += '<ul>';
  html += '  <li><h2>Companies:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/companies">getAll</a></li>';
  html += '      <li><a href="/api/company/1">getById</a></li>';
  html += '      <li><a href="/api/company/byName/pepsi">getByName</a></li>';
  html += '      <li><a href="/api/company/add">add</a></li>';
  html += '      <li><a href="/api/company/edit/1">edit</a></li>';
  html += '      <li><a href="/api/company/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Candidates:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/candidates">getAll</a></li>';
  html += '      <li><a href="/api/candidate/1">getById</a></li>';
  html += '      <li><a href="/api/candidate/byName/john">getByName</a></li>';
  html += '      <li><a href="/api/candidate/add">add</a></li>';
  html += '      <li><a href="/api/candidate/edit/1">edit</a></li>';
  html += '      <li><a href="/api/candidate/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Applications:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/applications">getAll</a></li>';
  html +=
    '      <li><a href="/api/applications/byPos/7">getByOpenPosition</a></li>';
  html += '      <li><a href="/api/applications/byCan/8">getByCandidate</a></li>';
  html += '      <li><a href="/api/applications/add">add</a></li>';
  html += '      <li><a href="/api/applications/edit/7">edit</a></li>';
  html += '      <li><a href="/api/applications/remove/5">remove</a></li>';
  html += '      <li><a href="/api/applications/1">getById</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Administrators:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/administrators">getAll</a></li>';
  html += '      <li><a href="/api/administrator/1">getById</a></li>';
  html +=
    '      <li><a href="/api/administrator/byName/Minerva">getByName</a></li>';
  html += '      <li><a href="/api/administrator/add">add</a></li>';
  html += '      <li><a href="/api/administrator/edit/2">edit</a></li>';
  html += '      <li><a href="/api/administrator/remove/3">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Psychologists:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/psychologists">getAll</a></li>';
  html += '      <li><a href="/api/psychologists/1">getById</a></li>';
  html +=
    '      <li><a href="/api/psychologists/byName?firstName=Mirvin&lastName=Dowdeswell">getByName</a></li>';
  html += '      <li><a href="/api/psychologists/add">add</a></li>';
  html += '      <li><a href="/api/psychologists/edit/1">edit</a></li>';
  html += '      <li><a href="/api/psychologists/remove/2">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Sessions:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/sessions">getAll</a></li>';
  html += '      <li><a href="/api/session/1">getById</a></li>';
  html +=
    '      <li><a href="/api/session/byIdCandidate/15">getByIdCandidate</a></li>';
  html +=
    '      <li><a href="/api/session/add?id=215&idPsychologists=215&idCandidate=215&date=11/23/2021&time=14:30&isActive=true">add</a></li>';
  html += '      <li><a href="/api/session/edit/50">edit</a></li>';
  html += '      <li><a href="/api/session/remove/40">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Profile-Types:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/profile-types">getAll</a></li>';
  html +=
    '      <li><a href="/api/profile-types/byName/administrative">getByName</a></li>';
  html += '      <li><a href="/api/profile-types/add">add</a></li>';
  html += '      <li><a href="/api/profile-types/edit/1">edit</a></li>';
  html += '      <li><a href="/api/profile-types/remove/2">remove</a></li>';
  html += '      <li><a href="/api/profile-types/1">getById</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Interviews:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/interviews">getAll</a></li>';
  html += '      <li><a href="/api/interviews/130">getById</a></li>';
  html += '      <li><a href="/api/interviews/byCompany/4">getByCompany</a></li>'; // change it from getByName
  html += '      <li><a href="/api/interviews/add">add</a></li>';
  html += '      <li><a href="/api/interviews/edit/130">edit</a></li>';
  html += '      <li><a href="/api/interviews/remove/130">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Open positions:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/api/open-positions">getAll</a></li>';
  html += '      <li><a href="/api/open-positions/5">getById</a></li>';
  html +=
    '      <li><a href="/api/open-positions/byIdCompany/12">getByIdCompany</a></li>';
  html += '      <li><a href="/api/open-positions/add">add</a></li>';
  html += '      <li><a href="/api/open-positions/edit/6">edit</a></li>';
  html += '      <li><a href="/api/open-positions/remove/4">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '</ul>';
  res.send(html);
});

router.get('/server-status', (req, res) =>
  res.send({
    status: 'Server OK',
  })
);

router.use('/psychologists', psychologists);

module.exports = router;

