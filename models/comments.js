const mongoose = require("mongoose");
const Video = require("./videos");

const commentSchema = new mongoose.Schema({
    content: {
        type:String,
        required: true,
    },
    userID: {
        type:String,
        required: true,
        default: "User_Test" //need to reference to user model when created
    },
    videoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    },
    likes: {
        type: Number,
        default: 0,
    }
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;