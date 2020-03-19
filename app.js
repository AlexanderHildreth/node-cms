// Modules
const bodyParser        = require('body-parser')
const express           = require('express')
const expHandlebars     = require('express-handlebars')
const flash             = require('connect-flash')
const methodOverride    = require('method-override')
const mongoose          = require('mongoose')
const path              = require('path')
const session           = require('express-session')
const upload            = require('express-fileupload')
// Models
const postsModel        = require('./models/Post')
// Routes
const adminRoutes       = require('./routes/admin/admin')
const homeRoutes        = require('./routes/home/home')
const postRoutes        = require('./routes/admin/posts')
// const vars
const app               = express();
const port              = process.env.PORT || 9999
const handlebarsHelpers = require('./helpers/handlebarsHelpers')

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
app.use(upload())
app.use(methodOverride('_method'))
app.use(session({
    secret: 'foobar',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage')
    res.locals.errorMessage = req.flash('errorMessage')
    res.locals.warningMessage = req.flash('warningMessage')

    next()
})
app.use('/', homeRoutes)
app.use('/admin', adminRoutes)
app.use('/admin/posts', postRoutes)

// Setting
app.engine('handlebars', expHandlebars({ defaultLayout: 'home', helpers: handlebarsHelpers}))
app.set('view engine', 'handlebars')


app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})