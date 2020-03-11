const bodyParser    = require('body-parser')
const express       = require('express')
const expHandlebars = require('express-handlebars')
const homeRoutes    = require('./routes/home/home')
const adminRoutes   = require('./routes/admin/admin')
const path          = require('path')

const app   = express();
const port  = process.env.PORT || 9999

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', homeRoutes)
app.use('/admin', adminRoutes)

// Setting
app.engine('handlebars', expHandlebars({ defaultLayout: 'home' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})