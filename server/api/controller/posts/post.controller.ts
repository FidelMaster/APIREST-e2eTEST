/*this controller  contains posts methods */

/* modules */
import mongoose = require('mongoose');
import { Request, Response } from "express";
 
const User = require('../../model/user');
const Posts = require('../../model/post');

export class Post {

    constructor() { }


    /*Methods */

    // req.user= user._id
    //  only send the token in header
    public async GetPostsByUser(req: Request, res: Response) {
        User.
            findOne({ _id: req.user }).
            populate('posts').
            exec(function (err, user) {
                if (err) return (err);
                return res.status(200).json({ user });
            });
    };

    public async GetAllPost(req: Request, res: Response) {
        let populate = {
            path: 'user', select: 'name'
        }
        const posts = await Posts.find().populate(populate).exec();
        return res.status(200).json({ posts });
    };

    public async CreatePost(req: Request, res: Response) {
        let tittle = req.body.tittle;
        let imageUrl = req.body.imageUrl;
        let content = req.body.content;
        let user = req.user;

        // validate body
        if (!tittle || !imageUrl || !content) {
            return res.status(400).send('the data is dont complete');
        }
        else if (!tittle.trim().length || !imageUrl.trim().length || !content.trim().length) {
            return res.status(400).send('the data is empty');
        }
        else {

            let newPost = {
                tittle: tittle,
                imageUrl: imageUrl,
                content: content,
                user: user
            };

            Posts.create(newPost).then(result => {
                // after save the post,  i will update user collection with push method           
                User.update(
                    { _id: user },
                    { $push: { posts: result._id } },
                    function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    }
                );

                Posts
                    .populate(result, { path: "user", select: 'name' })
                    .then(post => {

                        res.status(200).json({
                            message: "The Post is created",
                            post
                        });

                    })
            })
        }




    };

    public async UpdatePost(req: Request, res: Response) {
        let _id = req.body._id;
        let tittle = req.body.tittle;
        let imageUrl = req.body.imageUrl;
        let content = req.body.content;
        let user = req.user;

        // validate body
        if (!tittle || !imageUrl || !content) {
            return res.status(400).send('the data is dont complete');
        }
        else if (!tittle.trim().length || !imageUrl.trim().length || !content.trim().length) {
            return res.status(400).send('the data is empty');
        } else {
            // get data from req.body
            let newPost = {
                tittle: tittle,
                imageUrl: imageUrl,
                content: content,
                user: user
            };

            // validate if id is valid
            if (mongoose.Types.ObjectId.isValid(_id)) {
                // find the post and update
                Posts.findByIdAndUpdate(_id, { $set: newPost }, { new: true }).then((post) => {
                    if (post) {
                        return res.status(200).json({ success: true, message: 'The post is update' });
                    } else {
                        return res.status(400).json({ success: false, message: 'The post dont exist' });
                    }
                }).catch((err) => {
                    return res.status(400).json(err);
                })
            } else {
                return res.status(400).json({ success: false, message: 'please provide correct Id' });
            }

        }

    };

    public async DeletePost(req: Request, res: Response) {

        const _id = req.body._id;

        Posts.deleteOne({ _id: _id }, function (err) {
            console.log('here')
            if (err) return res.status(400).json({ success: false, message: 'The post dont exist' });
            //var post = User.posts(_id).remove();
           User.updateOne({
                'posts._id': req.body.ID
              }, {
                $pull: { posts: { _id: _id } }
              }, function (error, result) {
                if (err) return res.status(400).json({ message: error });
                return res.status(200).json({ success: true, message: 'The post is deliting' });
    
              });
           
            // deleted at most one tank document
        })



    };

  

}