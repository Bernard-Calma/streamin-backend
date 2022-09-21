const db = require("../models")

// ROUTES

// INDEX
// get - /videos
const index = (req, res) => {
    db.videos.find({}, (err, video) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json({
            video,
        })
    })
}


// CREATE
// post - /videos
const create = (req, res) => {
    db.videos.create(req.body, (err, video) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(video)
    })
}

// EDIT
// put - /videos/:id
const edit = (req, res) => {
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

// SHOW
// get - /videos/:id
const show = (req, res) => {
    db.videos.findById(req.params.id, (err, video) => {
        // console.log(video)
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(video) 
    })
}

// DESTROY
// delete - /videos/:id
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
    edit,
    destroy,
}