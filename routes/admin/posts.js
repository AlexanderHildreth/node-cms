const express       = require('express')
const fs            = require('fs')
const path          = require('path')
// Models
const Post          = require('../../models/Post')
// const vars
const router        = express.Router()
// Helpers
const uploadHelper  = require('../../helpers/uploadHelper') 

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
        res.render('admin/posts/edit', { post: post  })
    })
})

// Create
router.post('/create', (req, res) => {
    let fileName = '';

    if (!uploadHelper.isEmpty(req.files)) {
        let file = req.files.file
        fileName = Date.now() + `-${file.name}`
        
        file.mv(`./public/uploads/${fileName}`, (err) => {
            if(err) throw err
        }) 
    }
    
    var allowComments
    req.body.allowComments ? allowComments = true : allowComments = false

    const newPost = new Post({
        title: req.body.title,
        file: fileName,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments
    })
    
    newPost.save().then(savedPost => {
        req.flash('successMessage', `Post successfully created: ${savedPost.title}`)
        res.status(200).redirect('/admin/posts')
    }).catch(err => {
        console.log(`Could not save post\n${err}`)
    })
})

// Update
router.put('/edit/:id', (req, res) => {
    let fileName = '';
    
    if (!uploadHelper.isEmpty(req.files)) {
        let file = req.files.file
        fileName = Date.now() + `-${file.name}`

        file.mv(`./public/uploads/${fileName}`, (err) => {
            if (err) throw err
        })
    }

    Post.findById({ _id: req.params.id }).then(post => {
        var allowComments
        req.body.allowComments ? allowComments = true : allowComments = false

        post.title          = req.body.title
        post.file           = fileName
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
    Post.findOne({_id: req.params.id}).then(post => {
        fs.unlink(uploadHelper.uploadsDir + post.file, () => {
            Post.deleteOne({_id: req.params.id}).then(() => {
                res.redirect('/admin/posts')
            }).catch(err => {
                console.log(`Could not delete post\n${err}`)
            })
        })
    })

})

module.exports = router