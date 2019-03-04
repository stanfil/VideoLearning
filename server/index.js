let express = require('express')
let app = express()
let port = require('./settings').port
let uri = require('./settings').uri
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let morgan = require('morgan')

let user = require('./routes/user')
let admin = require('./routes/admin')
let course = require('./routes/course')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
// app.use('/course', course)
// app.use('/user', user)
mongoose.connect(uri, {useNewUrlParser: true})

let db = mongoose.connection
db.on('error', err => console.log('database connection failed!',err))
db.on('connected', () => console.log('database connection success!'))

app.use('/user', user)
app.use('/admin', admin)
app.use('/course', course)
app.listen(port, ()=>console.log(`Server running on port ${port}`))