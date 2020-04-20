// Modules
const faker = require('faker')
// files
const Category = require('../models/category');
const AppError = require('../utils/appError')

exports.getCategories =  async(req, res, next) => {
    const getCategories = await Category.find().sort('-dateModified');
    
    // flashArr = []
    // flashArr['success'] = (req.flash('successMessage'))
    // flashArr['error']   = (req.flash('errorMessage'))
    // flashArr['warning'] = (req.flash('warningMessage'))

    res.status(200).json({
        status: 'success',
        flash: flashArr,
        results: getCategories.length,
        data: {
            getCategories
        }
    })
}

exports.getCategoryById = async (req, res, next) => {
    const getCategoryById = await Category.findOne({ _id: req.params.id });
    
    if (!getCategoryById) return next(new AppError(`Category could not be found`, 404))

    res.status(200).json({
        status: 'success',
        results: getCategoryById.length,
        data: {
            getCategoryById
        }
    })
}

exports.updateCategory = async(req, res, next) => {
    const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            dateModified: Date.now()
        }}, { new: true }
    );

    if (!updateCategory) return next(new AppError('Could not update category!', 404));

    res.status(200).json({
        status: 'success',
        data: {
            updateCategory
        }
    });
};

exports.genTestCategories = async(req, res, next) => {
    for (let i = 0; i < req.body.amount; i++) {
        const testCategory = await Category();

        testCategory.name = faker.name.title()
        testCategory.dateCreated = Date.now()

        testCategoryCreated = testCategory.save()
        if (!testCategoryCreated) return next(new AppError('Could not add test categories!', 404));
    }

    req.flash('successMessage', `Test category successfully created`)
    res.redirect('/api/v1/admin/categories')
}

exports.createCategory = async(req, res, next) => {
    const newCategory = await Category();

    newCategory.name = req,params.name
    newCategory.dateCreated = Date.now()

    categoryCreate = newCategory.save()
    if (!categoryCreate) return next(new AppError('Could not add category!', 404));

    req.flash('successMessage', `Category successfully created: "${categoryCreate.name}"`)
    res.redirect('/api/v1/admin/categories')
}

exports.deleteCategory = async(req, res, next) => {
    const deleteCategory = await Category.findByIdAndDelete({_id: req.params.id})

    // if (!deleteCategory) return next(new AppError('Could not delete category!', 404));
    
    req.flash('successMessage', `Category successfully deleted`)
    res.redirect('/api/v1/admin/categories')
}
