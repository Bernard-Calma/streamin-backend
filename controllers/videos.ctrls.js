const db = require("../models")

// ROUTES

// INDEX
// get - /videos
const index = (_, res) => {
    // console.log("Video List Route Called.")
    db.videos.find({}, (err, videoList) => {
        // console.log(videoList)
        try {
            if(err) {
                // console.log(err)
                return res.status(404).json({error: err.message})
            }
            return res.status(200).json(videoList)
        }
        catch {
            return res.status(200).json(videoList)
        }
        
    })
}

// get videos and filter by user id
// get - /videos/:userid
const userVideos = (req, res) => {
    // console.log("Body", req.params)
    try {
        db.videos.find({user: req.params.userid}, (err, videos) => {
            // console.log("Video ", videos)
            if(err) return res.status(404).json({error: err.message})
            return res.status(200).json(videos)
        })
    } catch {
        return res.status(200).json({mess: "test"})
    }

}


// CREATE
// post - /videos
const create = (req, res) => {
    // console.log(req.body)
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
            req.body.videoLink = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${user}%2Fvideos%2F${postfix}%2F&show_text=false&t=0`
        } else if (req.body.videoLink.includes("dailymotion")){
            postfix = req.body.videoLink.slice(req.body.videoLink.lastIndexOf('/') + 1, req.body.videoLink.lastIndexOf('/') + 8);
            // console.log(postfix)
            req.body.videoLink = `https://www.dailymotion.com/embed/video/${postfix}`
            // console.log(req.body.videoLink)
        }
    }    
    db.videos.create(req.body, (err, video) => {
        try {
            if(err) {
                // console.log(err)
                return res.status(404).json({error: err.message})
            }
            return res.status(200).json(video)
        }
        catch {
            return res.status(200).json(video)
        }
        
    })
}

// EDIT
// put - /videos/:id
const edit = (req, res) => {
    // console.log("req.body : ", req.body);
    // console.log("params : ", req.params.id);
    db.videos.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        {
            new: true,
        },
        (err, updatedVideo) => {
            // console.log(err)
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedVideo)
            
        })
        
}

// INDEX
// Find Many
const search = (req, res) => {
    console.log("Search" , req.params.keyword)
    db.videos.find({title: {$regex: req.params.keyword, $options: "si"}}, (err, findVideos) => {
        console.log(findVideos)
        if(err) return res.status(400).json({error: err.message})
        return res.status(200).json(findVideos)
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
    // console.log(req.params)
    db.videos.findByIdAndDelete(req.params.id, (err, deletedVideo) => {
        try {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(deletedVideo)
        }
        catch {
            return res.status(200).json(deletedVideo)
        }
    })
}


module.exports ={
    index,
    create,
    show,
    edit,
    destroy,
    userVideos,
    search,
}