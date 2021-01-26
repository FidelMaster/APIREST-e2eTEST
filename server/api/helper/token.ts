/* this class is used for create and verify token */

/* Methods */
import { request, Request, response, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/iuser.interfaces";

class Token {
    token: String;

    constructor() {
        this.token = '';
    }

    public async CreateToken(user: IUser) {
        this.token = await jwt.sign({ _id: user.id, email: user.email }, `${process.env.TOKENKEY}`, {
            expiresIn: 60 * 60 * 24
        });
        return this.token;
    }


}
 

export default  new Token();