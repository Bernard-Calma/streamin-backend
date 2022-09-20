const db = require("../models")

//find by videoID and return all
const index = (req, res) => {
    // console.log("params", req.params)
    db.comments.find({_id: req.params.id}, (err, comment) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json({
            comment,
        })
    })
}



module.exports = {
    index,
}