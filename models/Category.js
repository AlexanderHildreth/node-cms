const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        require: true,
    }, dateCreated: {
        type: Date,
        require: null
    }, dateModified: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('categories', CategorySchema)
