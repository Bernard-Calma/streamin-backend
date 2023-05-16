const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    //all comments that are created by this ID will show in this array
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    //all videos that are created by this ID will show in this array
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    //all videos that are liked by this ID will show in this array
    likedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    //all comments that are liked by this ID will show in this array
    likedComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
})

const User = mongoose.model("User",userSchema)

module.exports = User;