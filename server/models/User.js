let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UseSchema = new Schema({
    email: String,
    password: String,
    username: String,
    purchased: Array,
},{
    timestamps: true,
})