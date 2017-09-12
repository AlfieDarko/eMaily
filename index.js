const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
// Let Remote Deployment Service determine port
// or just use port 5000

app.listen(PORT);
console.log("listening");
