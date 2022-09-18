//Express
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

//DB Connection
require("./config/db.connection")

app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT)
})