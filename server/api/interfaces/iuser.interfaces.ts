/* this File contains user interface */
import Moongoose = require('mongoose');

export interface IUser extends Moongoose.Document {
    id:Number
    email: string
    password: string
    posts: Int32Array
}