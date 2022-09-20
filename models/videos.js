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
        type: String,
        ref: "Comment",
    }],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    videoLink: {
        type: String,
        default: "https://www.youtube.com/embed/Ygu14YkQvUs",
        required: true,
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video;