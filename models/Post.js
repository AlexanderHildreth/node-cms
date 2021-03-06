const mongoose   = require('mongoose')

const Schema = mongoose.Schema
const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    }, file: {
        type: String
    }, body: {
        type: String,
        require: true
    }, status: {
        type: String,
        default: 'draft',
        require: true
    }, allowComments: {
        type: Boolean,
        require: true
    }, dateCreated: {
        type: Date,
        require: null
    }, dateModified: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('posts', PostSchema)
