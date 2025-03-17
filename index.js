require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3777;

async function start() {
 
  app.get("/", (req, res) => {
    res.send("ok");
  });
  app.listen(PORT, () => {
    const currentMode = process.env.MODE;
    console.log(`Сервер запущен на http://localhost:${PORT},'Режим работы' ${currentMode}`);
  });
}
start();
