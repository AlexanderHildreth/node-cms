// files
require('./config/database');
// Modules
const dotenv            = require('dotenv');
const express           = require('express')
const bodyParser        = require('body-parser')
const expHandlebars     = require('express-handlebars')
const flash             = require('connect-flash')
const methodOverride    = require('method-override')
const path              = require('path')
const session           = require('express-session')
const upload            = require('express-fileupload')
// Routes
const adminRoutes       = require('./routes/admin/admin')
const categoryRoutes    = require('./routes/admin/categories')
const homeRoutes        = require('./routes/home/home')
const postRoutes        = require('./routes/admin/posts')
// const vars
const app               = express();
const handlebarsHelpers = require('./helpers/handlebarsHelpers')

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Middleware
dotenv.config({ path: './secrets.env' });
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
// app.use(morgan('combined'));
app.use('/', homeRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/admin/categories', categoryRoutes)
app.use('/api/v1/admin/posts', postRoutes)

// Setting
app.engine('handlebars', expHandlebars({ defaultLayout: 'home', helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')

module.exports = app;
