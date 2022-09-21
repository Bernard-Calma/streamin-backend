// Express
const express = require("express");
const app = express();

// Port
const PORT = process.env.PORT || 3003;

// Import Cors
const cors = require("cors");
const whitelist = ["http://localhost:3003"]
const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}

// DB Connection
require("./config/db.connection")

// Internal Modules
const routes = require("./routes")

// middleware
app.use(cors()) // add corsOption to whitelist ports
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/videos", routes.videos);
app.use("/users",routes.users);
app.get("/", (req, res) => {
    res.send("Hello"); 
})

// Listen
app.listen(PORT, () => {
    console.log("Server is running at PORT: " + PORT)
})