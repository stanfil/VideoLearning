let express = require('express')
let app = express()
let router = express.Router()
let User = require('../models/User')

router.post('/login', (req, res) => {
    let { email, password } = req.body
    User.findOne({email, password})
        .then(user => {
            if(!user){
                return res.status(403).json({
                    ret: 1,
                })
            }
            res.json({
                ret: 0,
                username: user.username,
                purchased: user.purchased,
            })
        })
        .catch(err=> {
            console.log(err)
        })
})

router.post('/signup', (req, res) => {
    let { email, username, password } = req.body
    User.findOne({email})
        .then(user => {
            if(!user){
                let user = new User({email, username, password, purchased: []})
                return user.save().then(user=>{
                    res.json({
                        ret: 0,
                        purchased: []
                    })
                }).catch(err=>{
                    console.log(err)
                })
            }
            res.status(403).json({
                ret: 1
            })
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router