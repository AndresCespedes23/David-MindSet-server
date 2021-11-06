const express = require("express");
const candidates = require("./controllers/candidates");
const companies = require("./controllers/companies");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let html = "<h1>MindeSet</h1>";
  html += "<ul>";
  html += "  <li>Candidates:";
  html += "    <ul>";
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += "    </ul>";
  html += "  </li>";
  html += "</ul>";
  res.send(html);
});

app.get("/candidates", candidates.getAll);
app.get("/candidate/:id", candidates.getById);
app.get("/candidate/byName/:name", candidates.getByName);
app.get("/candidate/add", candidates.add);
app.get("/candidate/edit", candidates.edit);
app.get("/candidate/remove", candidates.remove);

app.get("/companies", companies.getAll);
app.get("/company/:id", companies.getById);
app.get("/company/byName/:name", companies.getByName);
app.get("/companies/add", companies.add);
app.get("/company/edit/:id", companies.edit);
app.get("/company/remove/:id", companies.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
