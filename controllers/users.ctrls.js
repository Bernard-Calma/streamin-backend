const db = require("../models")
const bcrypt = require("bcrypt");
const session = require("express-session")

// ROUTES

// Index
// get - /users
// added for future use if app needs to grab all user collection data
const index = async (req, res) => {
    await db.users.find({}, (err, foundUsers) => {
        try {
            if(err) return res.status(404).json({error: err.message})
            return res.status(200).json(foundUsers) 
        } catch {
            return res.status(200).json(foundUsers) 
        }

    })
}

// CREATE
// post - /users
const create = (req, res) => {
    // console.log(req.body)
    const salt = bcrypt.genSaltSync(10);
    req.body.username = req.body.username.toLowerCase();
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    delete req.body.passwordCheck
    // console.log(req.body)
    db.users.create(req.body, (err, user) => {
        try {
            if(err) {
                console.log(err)
                return res.status(400).json({err:"Username already been taken"});
            }
            return res.status(200).json(user)
        } catch (err) {
            return res.status(404).json({error: err.message})
        }
    })
}

// SHOW
// put - /users/:id
// bcrypt needs to be installed in the front end to compare hashed password
// !bcrypt.compareSync(req.body.password, user.password)
const show = (req, res) => {
    db.users.findById(req.params.id, (err, user) => {
        try {
            if(err) return res.status(404).json({error: err.message})
            return res.status(200).json(user) 
        } catch (err) {
            return res.status(404).json({error: err.message})
        }
        
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
            try {
                if(err) return res.status(400).json({error: err.message})
                return res.status(200).json(updatedUser)
            } catch (err) {
                return res.status(200).json(updatedUser)
            }

        }
        )
}

// LOGIN
// get - /user/:username
// This will return the data of a user
// Passing a parameter of username at login
// If found it will return the data and compare password
// If true it will return the date
// If false it will return an error
const login = async (req, res) => {
    // console.log(req.body)
    const user = await db.users.findOne({username: req.body.username.toLowerCase()})
    // console.log(user)
    if (!user) {
        console.log("user does not exist.")
        return res.status(404).json({err: "User does not exist"})
    //unhash password
    } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            user.password = undefined
            // user deleted password
            // console.log(user)
            res.status(200).json(user)
        } else {
            res.status(400).json({err: "Invalid username or password."})
        }
    }
}

module.exports = {
    create,
    show,
    edit,
    index,
    login,
}