var express = require("express");
var app = express();
var promise = require("bluebird");
var pgp = require("pg-promise")({ promiseLib: promise });

const connectString = "postgres://postgres:password@localhost:5432/postgres";
var db = pgp(connectString);

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/userdata", (req, res) => {
  db.any("SELECT * FROM users ORDER BY level DESC")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/userdata/delete/:id", (req, res) => {
  db.none(`DELETE FROM users WHERE id=${req.params.id}`);
});

app.post("/api/userdata/new", (req, res) => {
  const { id, nickname, level } = req.body;

  db.none(`INSERT INTO users VALUES (${id}, '${nickname}', ${level})`);

  res.redirect("/");
});

app.post("/api/userdata/modify/:id", (req, res) => {
  const { nickname, level } = req.body;

  db.none(`UPDATE users SET nickname='${nickname}' WHERE id=${req.params.id}`);
  db.none(`UPDATE users SET level=${level} WHERE id=${req.params.id}`);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
