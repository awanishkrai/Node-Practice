const { urlencoded } = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = new express();
app.use(urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/download">
    <input type="text" name="filename"/>
    <button type="submit">Submit</button>
    </form>
    `);
});

const data = "name=Awanish Kumar Rai\n RegNo-12307068\n Grade=A";

app.post("/download", (req, res) => {
  const filename = req.body.filename;
  const filepath = path.join(__dirname, `${filename}.text`);
  fs.writeFileSync(filepath, data);

  res.download(filepath);
});
app.listen(3000, () => {
  console.log("3000");
});
