const express = require('express');
const psychologists = require('./psychologists');

const router = express.Router();

router.get('/', (req, res) => {
  let html = '<h1>MindSet</h1>';
  html += '<ul>';
  html += '  <li><h2>Companies:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/companies">getAll</a></li>';
  html += '      <li><a href="/company/1">getById</a></li>';
  html += '      <li><a href="/company/byName/pepsi">getByName</a></li>';
  html += '      <li><a href="/company/add">add</a></li>';
  html += '      <li><a href="/company/edit/1">edit</a></li>';
  html += '      <li><a href="/company/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Candidates:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += '      <li><a href="/candidate/1">getById</a></li>';
  html += '      <li><a href="/candidate/byName/john">getByName</a></li>';
  html += '      <li><a href="/candidate/add">add</a></li>';
  html += '      <li><a href="/candidate/edit/1">edit</a></li>';
  html += '      <li><a href="/candidate/remove/100">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Applications:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/applications">getAll</a></li>';
  html +=
    '      <li><a href="/applications/byPos/7">getByOpenPosition</a></li>';
  html += '      <li><a href="/applications/byCan/8">getByCandidate</a></li>';
  html += '      <li><a href="/applications/add">add</a></li>';
  html += '      <li><a href="/applications/edit/7">edit</a></li>';
  html += '      <li><a href="/applications/remove/5">remove</a></li>';
  html += '      <li><a href="/applications/1">getById</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Administrators:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/administrators">getAll</a></li>';
  html += '      <li><a href="/administrator/1">getById</a></li>';
  html +=
    '      <li><a href="/administrator/byName/Minerva">getByName</a></li>';
  html += '      <li><a href="/administrator/add">add</a></li>';
  html += '      <li><a href="/administrator/edit/2">edit</a></li>';
  html += '      <li><a href="/administrator/remove/3">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Psychologists:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/psychologists">getAll</a></li>';
  html += '      <li><a href="/psychologists/1">getById</a></li>';
  html +=
    '      <li><a href="/psychologists/byName?firstName=Mirvin&lastName=Dowdeswell">getByName</a></li>';
  html += '      <li><a href="/psychologists/add">add</a></li>';
  html += '      <li><a href="/psychologists/edit/1">edit</a></li>';
  html += '      <li><a href="/psychologists/remove/2">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Sessions:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/sessions">getAll</a></li>';
  html += '      <li><a href="/session/1">getById</a></li>';
  html +=
    '      <li><a href="/session/byIdCandidate/15">getByIdCandidate</a></li>';
  html +=
    '      <li><a href="/session/add?id=215&idPsychologists=215&idCandidate=215&date=11/23/2021&time=14:30&isActive=true">add</a></li>';
  html += '      <li><a href="/session/edit/50">edit</a></li>';
  html += '      <li><a href="/session/remove/40">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Profile-Types:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/profile-types">getAll</a></li>';
  html +=
    '      <li><a href="/profile-types/byName/administrative">getByName</a></li>';
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
  html += '      <li><a href="/interviews/byCompany/4">getByCompany</a></li>'; // change it from getByName
  html += '      <li><a href="/interviews/add">add</a></li>';
  html += '      <li><a href="/interviews/edit/130">edit</a></li>';
  html += '      <li><a href="/interviews/remove/130">remove</a></li>';
  html += '    </ul>';
  html += '  </li>';
  html += '  <li><h2>Open positions:</h2>';
  html += '    <ul>';
  html += '      <li><a href="/open-positions">getAll</a></li>';
  html += '      <li><a href="/open-positions/5">getById</a></li>';
  html +=
    '      <li><a href="/open-positions/byIdCompany/12">getByIdCompany</a></li>';
  html += '      <li><a href="/open-positions/add">add</a></li>';
  html += '      <li><a href="/open-positions/edit/6">edit</a></li>';
  html += '      <li><a href="/open-positions/remove/4">remove</a></li>';
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
