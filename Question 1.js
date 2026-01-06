// Question 1
// Create an express application for the following scenario:
// a) Create a text file and add student information (Reg. No., Name, Grade) in the server system.
// b) Accept a file name from the input text field of a user web page and transfer the requested file using the download() function from the server as a response to the button click event from the user web page.

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
