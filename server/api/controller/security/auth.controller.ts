/*this controller is use for signIn and signUp methods */

/* modules */

import { Request, Response } from "express";
import token from "../../helper/token";
import { Cripthography } from "../../helper/cripthography";


const User = require('../../model/user');
const cripthography = new Cripthography();

export const signIn = async (
    req: Request,
    res: Response
): Promise<Response> => {

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ success: false, msg: "Please. Send your email and password" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ success: false, msg: "The User does not exists" });
    }

    const isMatch = await cripthography.matchPassword(req.body.password, user.password);
    if (isMatch) {
        return res.status(200).json({ success: true, token: await token.CreateToken(user) });
    }

    return res.status(400).json({
        success: false,
        msg: "The email or password are incorrect"
    });
};




export const signUp = async (
    req: Request,
    res: Response
): Promise<Response> => {

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ success: false, msg: "Please. Send your email and password" });
    }

    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: "Please. Send your name" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ success: false, msg: "The User already Exists" });
    }

    const newUser = new User({
        email: req.body.email,
        password: await cripthography.encryptPassword(req.body.password),
        name: req.body.name
    });
    await newUser.save()
    // return token 
    return res.status(201).json({    success:true, token: await token.CreateToken(newUser) });
};


