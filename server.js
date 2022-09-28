// Express
const express = require("express");
const session = require("express-session")
const app = express();
require("dotenv").config();
// Port
const PORT = process.env.PORT || 3003;

// Import Cors
const cors = require("cors");
// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
//     res.header("Access-Control-Allow-Headers", "application/json")
//     res.header("Access-Control-Allow-Credentials", true)
//     next();
// })
const whitelist = ["http://localhost:3000",`${process.env.FRONTEND_URL}`, `${process.env.BACKEND_URL}`]
const corsOptions = {
    origin: function (origin, callback) {
        console.log("test")
        if(whitelist.indexOf(origin) !== -1 || !origin) {
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

// Sessions
// const SESSION_SECRET = process.env.SESSION_SECRET
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }))

// Unable to make session work need to research more
// app.use("/videos",(req, res, next) => {
//     res.locals.currentUser = req.session.currentUser
//     if (req.session.currentUser) {
//         res.locals.authenticated = true;
//         next();
//     } else {
//         console.log("session failed, need to login")

//     }
// })



// middleware
app.use(cors(corsOptions)) // add corsOption to whitelist ports
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