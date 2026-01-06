const express = require("express");
const app = new express();
app.use(express.urlencoded({ extended: true }));
function operations(req, res, next) {
  const a = Number(req.body.a);
  res.locals.increment = a + 1;
  res.locals.decreament = a - 1;
  res.locals.square = a * a;
  next();
}
app.get("/", (req, res) => {
  res.send(`
        <form method="POST" action="/oper">
        <input type="text" name="a"/>
        <button type="submit" >Submit</button>
        </form> 
        `);
});
app.post("/oper", operations, (req, res) => {
  const increment = res.locals.increment;
  const decreament = res.locals.decreament;
  const square = res.locals.square;
  res.send(`
        <h1>increament- ${increment}\n</h1>
        <h1>decrement- ${decreament}\n</h1>
        <h1>square- ${square}\n</h1>
        `);
});
app.listen(3000, () => {
  console.log("server running at 3000");
});
