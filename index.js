const express = require("express");
const candidates = require("./controllers/candidates");
const companies = require("./controllers/companies");
const compdata = require("./data/companies.json");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  let html = "<h1>MindeSet</h1>";
  html += "<ul>";
  html += "  <li>Candidates:";
  html += "    <ul>";
  html += '      <li><a href="/candidates">getAll</a></li>';
  html += "    </ul>";
  html += "  </li>";
  html += "</ul>";
  res.send("MindSet");
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
app.get("/company/add", companies.add);
app.get("/company/edit", companies.edit);
app.get("/company/remove", companies.remove);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
