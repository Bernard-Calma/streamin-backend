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

// get videos and filter by user id
// get - /videos/:userid
const userVideos = (req, res) => {
    // console.log("Body", req.body)
    try {
        db.videos.find({user: req.params.userid}, (err, videos) => {
            // console.log("Video ", video)
            if(err) return res.status(404).json({error: err.message})
            return res.status(200).json(videos)
        })
    } catch (err) {
        return res.status(404).json({error: err.message})
    }

}


// CREATE
// post - /videos
const create = (req, res) => {
    // console.log(req.body.videoLink)
    let postfix = ""
    if(req.body.videoLink){
        // YouTube
        if(req.body.videoLink.includes("youtube")){
            // console.log(req.body.videoLink.lastIndexOf('/'))
            if(req.body.videoLink.lastIndexOf('/') >= 25){
                postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1);
            } else {
                // console.log(req.body.videoLink.lastIndexOf('='))
                if (req.body.videoLink.lastIndexOf('=') >= 45){
                    postfix = req.body.videoLink.slice(req.body.videoLink.indexOf('=') + 1,req.body.videoLink.lastIndexOf('=') - 2)  
                    // console.log(postfix)
                } else {
                    postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('=') + 1);
                }
            } 
            // console.log(postfix)
            req.body.videoLink = `https://www.youtube.com/embed/${postfix}`
        } else if (req.body.videoLink.includes("vimeo")){
            postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1)
            req.body.videoLink = `https://player.vimeo.com/video/${postfix}`
        } else if (req.body.videoLink.includes("facebook")){
            let user;
            // console.log(req.body.videoLink.slice(req.body.videoLink.indexOf('.com/') + 5, req.body.videoLink.indexOf('/', req.body.videoLink.indexOf('.com/') + 6)))
            user = req.body.videoLink.slice(req.body.videoLink.indexOf('.com/') + 5, req.body.videoLink.indexOf('/', req.body.videoLink.indexOf('.com/') + 6))
            // console.log(req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1))
            postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1)
            req.body.videoLink = `https://www.facebook.com/plugins/video.php?height=401&href=https%3A%2F%2Fwww.facebook.com%2F${user}%2Fvideos%2F${postfix}%2F&show_text=false&width=560&t=0`
        } else if (req.body.videoLink.includes("dailymotion")){
            postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1, req.body.videoLink.lastIndexOf('/') + 8);
            // console.log(postfix)
            req.body.videoLink = `https://www.dailymotion.com/embed/video/${postfix}`
            // console.log(req.body.videoLink)
        }
    }    
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
    userVideos,
}