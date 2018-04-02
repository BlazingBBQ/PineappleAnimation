var express = require("express");
var app = express();
var path = require("path");

const INDEX = path.join(__dirname, "dist/index.html");
app.use("/dist", express.static(__dirname + "/dist"));

app.get('/', (req, res) => {
  res.sendFile(INDEX);
});
app.listen(8000, () => {
  console.log("Listening on port 8000")
});
