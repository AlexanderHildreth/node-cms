const express = require('express')
// const fs = require('fs')
// Models
const Category = require('../../models/Category')
// const vars
const router = express.Router()
// Helpers
// const uploadHelper = require('../../helpers/uploadHelper')

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

module.exports = router
