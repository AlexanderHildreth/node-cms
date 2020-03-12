// Modules
const bodyParser    = require('body-parser')
const express       = require('express')
const expHandlebars = require('express-handlebars')
const mongoose      = require('mongoose')
const path          = require('path')
// Models
const postsModel    = require('./models/Post')
// Routes
const adminRoutes   = require('./routes/admin/admin')
const homeRoutes    = require('./routes/home/home')
const postRoutes    = require('./routes/admin/posts')
// const vars
const app           = express();
const port          = process.env.PORT || 9999

// DB connection
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log('DB connection established, listening on port 27017...')
}).catch((err) => {
    console.log(`There was an error establishing connection:\n${err}`)
})

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', homeRoutes)
app.use('/admin', adminRoutes)
app.use('/admin/posts', postRoutes)

// Setting
app.engine('handlebars', expHandlebars({ defaultLayout: 'home' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})