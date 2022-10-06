const mongoose = require("mongoose");


// use /videos/:id - show
// /videos - index
// /videos - create
const videoSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
    },
    user: { // video will be attached to a user
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: String,
    likes: [{ //related to user schema to be able get array length to count number of likes
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        }],
    comments: [{ // Comment Object
        user: { // each index needs a userID
            type: String,
            required: true,
        },
        likes: [String], // likes is an array of strings of userIDs
        date: Date,
        comment: { // Comments' content
            type: String,
            required: true,
        },
    },],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    videoLink: { //user needs grab a link, this link might need to be src in an iFram to be rendered
        // need to research what kind of element or how to make the video show up on front end
        type: String,
        required: true,
    },
    tags: [{ //tags list will be set in the front-end.
        type: String,
    }],
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video;