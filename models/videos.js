const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    user: { // will need to be attached to logged in user
        type: String,
        default: "Guest",
    },
    description: String,
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        body: String,
        commentDate: Date
    }],
    publishedDate: {
        type: Date,
        default: Date.now,
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video;