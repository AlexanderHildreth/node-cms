const express       = require('express')
// const vars
const validator     = require('../../utils/validateRules')
const catController = require('../../controllers/categoryController')
const router        = express.Router()

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
})

// Get
router.get('/', catController.getCategories)

router.route('/:id')
.get(
    catController.getCategoryById
).put(
    validator.catValidator(),
    validator.validate,
    catController.updateCategory
)

router.get('/:name', (req, res) => {
    
})

// Create
router.route('/generate-test-categories')
.post(
    catController.genTestCategories
)

router.route('/create')
.post(
    validator.catValidator(),
    validator.validate,
    catController.createCategory
)
    
// Remove
router.route('/delete/:id')
.delete(
    catController.deleteCategory
)

module.exports = router