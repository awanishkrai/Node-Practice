const express = require("express");
const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/user";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.error(error);
  });
const user = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  regno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
const userdb = new mongoose.model("userdb", user);
app.get("/", (req, res) => {
  res.send(`<form method="POST" action="/insert">
        <input type="text" name="first_name"/>
        <input type="text" name="last_name"/>
        <input type="text" name="regno">
        <input type="email" name="email">
        <button type="submit">Submit</button>
        </form>`);
});
app.post("/insert", async (req, res) => {
  try {
    const savedUser = await userdb.create(req.body); // wait for DB
    res.status(201).json(savedUser); // send inserted data
  } catch (err) {
    res.status(400).json({ error: err.message }); // handle validation/duplicate errors
  }
});
app.listen(300, () => console.log("server running"));
