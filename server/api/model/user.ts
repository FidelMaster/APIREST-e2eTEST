/*this file contain user model */

/* Modules */
import mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*Collection*/
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId , ref: 'Post'
    }]
});




/* Creating User Model */
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;