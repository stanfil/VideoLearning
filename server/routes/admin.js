let express = require('express')
let app = express()
let router = express.Router()
let admin = require('../settings').admin
let User = require('../models/User')
router.post('/login', (req, res) => {
    let { username, password } = req.body
    if(username === admin.username && password === admin.password){
        return res.json({
            ret: 0
        })
    }
    return res.status(403).json({
        ret: 1,
    })
})

router.post('/buycourse',(req, res)=> {
    let { email, courses} = req.body
    User.findOne({email})
        .then(user => {
            user.purchased = user.purchased.concat(courses.split(','))
            user.save().then(user => {
                res.json({
                    ret: 0,
                    purchased: user.purchased
                })
            })

        })
        .catch(err=>{
            console.log(err)
        })
})


module.exports = router