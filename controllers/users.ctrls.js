const db = require("../models")

// ROUTES

// CREATE
// post - /users
const create = (req, res) => {
    db.users.create(req.body, (err, user) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(user)
    })
}

// SHOW
// put - /users/:id
const show = (req, res) => {
    db.users.findById(req.params.id, (err, user) => {
        if(err) return res.status(404).json({error: err.message})
        return res.status(200).json(user) 
    })
}

// EDIT
// post - /users/:id
const edit = (req, res) => {
    db.users.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        {
            new: true,
        },
        (err, updatedUser) => {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedUser)
        }
        )
}

module.exports = {
   
    create,
    show,
    edit,

}