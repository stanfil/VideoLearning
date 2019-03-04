let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    email: String,
    password: String,
    username: String,
    purchased: Array,
},{
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema)