const express   = require('express')
// Models
const Post      = require('../../models/Post')
// const vars
const router    = express.Router()

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

// Get
router.get('/', (req, res) => {
    Post.find({}).lean().then(posts => {
        res.render('admin/posts', { posts: posts })
    })
})
router.get('/create', (req, res) => {
    res.render('admin/posts/create')
})
router.get('/edit/:id', (req, res) => {
    Post.findById({_id: req.params.id}).lean().then(post => {
        res.render('admin/posts/edit', {post: post})
    })
})

// Create
router.post('/create', (req, res) => {
    var allowComments
    req.body.allowComments ? allowComments = true : allowComments = false

    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments
    })

    newPost.save().then(() => {
        res.status(200).redirect('/admin/posts')
    }).catch(err => {
        console.log(`Could not save post\n${err}`)
    })
})

// Update
router.put('/edit/:id', (req, res) => {
    Post.findById({ _id: req.params.id }).then(post => {
        var allowComments
        req.body.allowComments ? allowComments = true : allowComments = false

        post.title          = req.body.title
        post.body           = req.body.body
        post.status         = req.body.status
        post.allowComments  = allowComments

        post.save().then(updatedPost => {
            res.status(200).redirect('/admin/posts')
        }).catch(err => {
            console.log(`Could not save post\n${err}`)
        })

    })
})

// Remove
router.delete('/delete/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/admin/posts')
    }).catch(err => {
        console.log(`Could not delete post\n${err}`)
    })
})

module.exports = router