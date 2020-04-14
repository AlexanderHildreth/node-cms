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
const categoryRoutes    = require('./routes/admin/categories')
const homeRoutes        = require('./routes/home/home')
const postRoutes        = require('./routes/admin/posts')
// const vars
const app               = express();
const appPort           = process.env.PORT || 9999
const handlebarsHelpers = require('./helpers/handlebarsHelpers')
const mongoDbUrl        = require('./config/database');
const mongoDbPort       = process.env.MONGOD_DB_PORT || 27017;

// DB connection
mongoose.Promise = global.Promise

mongoose.connect(mongoDbUrl.url, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log(`DB connection established, to db: ${mongoDbPort}...`)
}).catch((err) => {
    console.log(`There was an error establishing connection:\n${err}`)
    console.log(`\n${mongoDbURL}`)
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
app.use('/admin/categories', categoryRoutes)
app.use('/admin/posts', postRoutes)

// Setting
app.engine('handlebars', expHandlebars({ defaultLayout: 'home', helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')


app.listen(appPort, () => {
    console.log(`Server is listening on port ${appPort}...`)
})
