const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CategoryTestSchema = new Schema({
    name: {
        type: String,
        require: true,
    }, dateCreated: {
        type: Date,
        require: true
    }, dateModified: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('categories', CategoryTestSchema)
