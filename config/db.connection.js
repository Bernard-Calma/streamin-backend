const mongoose = require("mongoose");

const mongodbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/streaminDB";
// set up connection with the DB
mongoose.connect(mongodbURL);

// set up listeners to monitor your database connection
mongoose.connection.on('connected', ()=> console.log('DB connected... 🙌🙌🙌', mongodbURL));
mongoose.connection.on('error', (err)=> console.log(err.message));
mongoose.connection.on('disconnected', ()=> console.log('mongoose disconnected'));