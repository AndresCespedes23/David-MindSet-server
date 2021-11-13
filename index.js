const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const port = 8000;
//mongodb+srv://userDavid:pswDavid@radiumcluster.ffqld.mongodb.net/mindset2021?retryWrites=true&w=majority
/* MongoDB Atlas Connection */
mongoose.connect("'mongodb+srv://radium:radium123456@cluster0.urj6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'", (err) => {
  if (err) {
    console.log("error connecting database");
  } else {
    console.log("data base connected");
  }
});

app.use(express.json());
app.use(cors());

app.use("/api", routes);
/*
app.get("/applications", applications.getAll);
app.get("/applications/byPos/:id", applications.getByPosition);
app.get("/applications/byCan/:id", applications.getByCandidate);
app.get("/applications/add", applications.add);
app.get("/applications/edit/:id", applications.edit);
app.get("/applications/remove/:id", applications.remove);
app.get("/applications/:id", applications.getById);
*/
app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
