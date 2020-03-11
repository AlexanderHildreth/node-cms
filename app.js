const bodyParser    = require('body-parser')
const express       = require('express')
const expHandlebars = require('express-handlebars')
const path          = require('path')

const app   = express();
const port  = process.env.PORT || 9999

app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', expHandlebars({ defaultLayout: 'home' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home/index')
})

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
})