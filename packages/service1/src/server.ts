// Simple express server

import express from "express";

const app = express();
const port = 3000;

app.get("*", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World!");
});

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});
