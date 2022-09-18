const db = require("../models")

// ROUTES
const index = (req, res) => {
    db.videos.find({}, (err, video) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json({
            video,
        })
    })
}

const create = (req, res) => {
    db.videos.create(req.body, (err, video) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(video)
    })
}

module.exports ={
    index,
    create,
}