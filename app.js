const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello DevOps world !");
});

// Connexion au serveur
app.listen(6969, () => {
  console.log("Server is listening on port 6969");
});
