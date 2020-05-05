const express = require("express");
const app = express();
const PORT = 3500;

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(PORT, (err) =>
  console.log(err ? err : `Server running at http://192.168.0.103:${PORT}/`)
);
