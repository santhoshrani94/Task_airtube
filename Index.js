const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userrouter = require("./routes/Users");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json()); 

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/", userrouter);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("database connect");


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
});
