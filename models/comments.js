const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type:String,
        required: true,
    },
    userID: { // tied up to userID that creted the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videoID: { // tied up to videoID where the comment is created
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    likes: [{ //related to user schema to be able get array length to count number of likes
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;