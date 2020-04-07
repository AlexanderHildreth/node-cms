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
        requird: true
    }, status: {
        type: String,
        default: 'draft',
        require: true
    }, allowComments: {
        type: Boolean,
        require: true
    }, dateCreated: {
        type: Date,
        require: true
    }, dateModified: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('posts', PostSchema)