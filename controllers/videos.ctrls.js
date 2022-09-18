const db = require("../models")

// ROUTES
const index = (req, res) => {
    db.Videos.find({}, (err, video) => {
        if(err) return res.status(400).json({error: err.message})
        return res.status(200).json({
            video,
        })
    })
}

module.exports ={
    index,
}