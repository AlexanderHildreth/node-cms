const express   = require('express')
const faker     = require('faker')
// Models
const Post      =  require('../../models/Post')
// const vars
const router    = express.Router()

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.post('/generate-fake-posts', (req, res) => {
    for(let i = 0; i < req.body.amount; i++) {
        let post = new Post();

        post.title          = faker.name.title()
        post.body           = faker.lorem.paragraphs()
        post.status         = faker.random.arrayElement(["draft",  "private",  "public"])
        post.allowComments  = faker.random.boolean()
    
        post.save(function(err) {
            if(err) throw err
        })
    }

    res.redirect('/admin/posts');
})

module.exports = router;