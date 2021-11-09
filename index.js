const express = require("express");
const psychologists = require("./controllers/psychologists");
const candidates = require("./controllers/candidates");
const app = express();
const port = 8000;
app.use(express.json());

app.get("/", (req, res) => {
	let html = "<h1>MindSet</h1>";
	html += "<ul>";
	html += "  <li>psychologists:";
	html += "    <ul>";
	html += '      <li><a href="/psychologists">getAll</a></li>';
	html += '      <li><a href="/psychologists/1">getById</a></li>';
	html += '      <li><a href="/psychologists/byName?firstName=Mirvin&lastName=Dowdeswell">getByName</a></li>';
	html += '      <li><a href="/psychologists/add">add</a></li>';
	html += '      <li><a href="/psychologists/edit/1">edit</a></li>';
	html += '      <li><a href="/psychologists/remove/2">remove</a></li>';
	html += "    </ul>";
	html += "  </li>";
	html += "</ul>";
	res.send(html);
});

app.get("/psychologists", psychologists.getAll);
app.get("/psychologists/add", psychologists.add);
app.get("/psychologists/edit/:id", psychologists.edit);
app.get("/psychologists/remove/:id", psychologists.remove);
app.get("/psychologists/byName", psychologists.getByName);
app.get("/psychologists/:id", psychologists.getById);

app.listen(port, () => {
	console.log(`Open your browser in http://localhost:${port}`);
});
