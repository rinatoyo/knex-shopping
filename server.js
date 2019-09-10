"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const users = require("./routes/users");
const products = require("./routes/products");
const carts = require("./routes/carts");

const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello netizens. Welcome to Knex Store");
});

app.use("/users", users);
// app.use("/products", products);
// app.use("/carts", carts);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
