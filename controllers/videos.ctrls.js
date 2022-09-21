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


// CREATE
const create = (req, res) => {
    db.videos.create(req.body, (err, video) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(video)
    })
}

// SHOW

const show = (req, res) => {
    // console.log(req.params.id)
    db.videos.findById(req.params.id, (err, video) => {
        // console.log(video)
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(video) 
    })
}

const update = (req, res) => {
    db.videos.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        {
            new: true,
        },
        (err, updatedVideo) => {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedVideo)
        })
}

const destroy = (req, res) => {
    db.videos.findByIdAndDelete(req.params.id, (err, deletedVideo) => {
        if(err) return res.status(400).json({error: err.message})
        return res.status(200).json(deletedVideo)
    })
}


module.exports ={
    index,
    create,
    show,
    update,
}