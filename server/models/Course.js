let mongoose = require('mongoose')
let Schema = mongoose.Schema
let CourseSchema = new Schema({
    title: String,
    name: String,
    date: String,
    cover: String,
    intro: String,
    price: String,
    chapters: Array,
},{
    timestamps: true
})

module.exports = mongoose.model('Course', CourseSchema)