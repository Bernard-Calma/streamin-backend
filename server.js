// Express
const express = require("express");
const app = express();

// Port
const PORT = process.env.PORT || 3003;

// DB Connection
require("./config/db.connection")

// Internal Modules
const routes = require("./routes")

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/videos", routes.videos);
app.get("/", (req, res) => {
    res.send("Hello"); 
})

// Listen
app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT)
})