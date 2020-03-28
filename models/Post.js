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
    }, date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('posts', PostSchema)