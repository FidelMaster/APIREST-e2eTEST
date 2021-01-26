/*this file contain Post model */

/*Modules */
import  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    tittle: {
        type: String,
        required: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,ref: 'User'
    }
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;