const express = require('express')
// Models
const Category = require('../../models/Category')
// const vars
const router = express.Router()

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

// Get
router.get('/', (req, res) => {
    Category.find({}).lean().then(categories => {
        res.render('admin/categories', { categories: categories })
    })
})
router.get('/edit/:id', (req, res) => {
    Category.findById({ _id: req.params.id }).lean().then(category => {
        res.render('admin/categories/edit', { category: category })
    })
})

// Create
router.post('/create', (req, res) => {   
    if (!req.body.name) {
        res.render('admin/categories', { error: 'Please enter a valid name' })
        return;
    }

    const newCategory = new Category({
        name: req.body.name,
        dateCreated: Date.now(),
        dateModified: Date.now()
    })

    newCategory.save().then(savedCategory => {
        req.flash('successMessage', `Category successfully created: "${savedCategory.name}"`)
        res.redirect('/admin/categories')
    }).catch(err => {
        req.flash('errorMessage', `There was an error saving category: ${err.errors}`)
        res.render('admin/categories')
        return;
    })
})

// Update
router.put('/edit/:id', (req, res) => {
    if (!req.body.name) {
        res.render('admin/categories', { error: 'Please enter a valid name' })
        return;
    }

    Category.findById({ _id: req.params.id }).then(category => {
        category.name = req.body.name

        category.save().then(updatedCategory => {
            req.flash('successMessage', `Category successfully updated: "${updatedCategory.name}"`)
            res.status(200).redirect('/admin/categories')
        }).catch(err => {
            req.flash('errorMessage', `There was an error saving category: ${err.errors}`)
            res.render('admin/categories')
            return;
        })
    })
})

// Remove
router.delete('/delete/:id', (req, res) => {
    Category.findOne({ _id: req.params.id }).then(() => {
        Category.deleteOne({ _id: req.params.id }).then(() => {
            req.flash('warningMessage', `Category successfully deleted!`)
            res.redirect('/admin/categories')
        }).catch(err => {
            req.flash('errorMessage', `Could not delete category\n${err}`)
            res.redirect('/admin/categories')
        })
    })
})

module.exports = router
