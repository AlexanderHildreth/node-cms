const mongoose   = require('mongoose')

const Schema = mongoose.Schema
const PostSchema = new Schema({
    title: {
        type: String,
        require: true
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
    }
})

module.exports = mongoose.model('posts', PostSchema)