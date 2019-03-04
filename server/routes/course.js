let express = require('express')
let app = express()
let router = express.Router()
let Course = require('../models/Course')

router.get('/getall', (req, res) => {
    Course.find()
        .then(courses => {
            return res.json({
                ret: 0,
                courses
            })
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/', (req, res) => {
    const link = req.query.link
    Course.findOne({link})
        .then(course =>{
            return res.json({
                ret: 0,
                course
            })
        })
        .catch(err=> {
            console.log(err)
        })
})

router.post('/save', (req, res) => {
    const creq = req.body.course
    Course.findOne({_id: creq._id})
        .then(course => {
            if(!course){
                let c = new Course(creq)
                return c.save().then(course => {
                    res.json({
                        ret: 0
                    })
                })
            }

            course.title = creq.title
            course.link = creq.link
            course.date = creq.date
            course.price = creq.price
            course.cover = creq.cover
            course.intro = creq.intro
            course.vintro = creq.vintro
            course.chapters = creq.chapters
            course.save().then(course=>{
                res.json({
                    ret:0
                })
            })
        }).catch(err=> {
            console.log(err)
        })
})



module.exports = router