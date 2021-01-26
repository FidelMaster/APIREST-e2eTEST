 /* auth routes */

 import { Router } from "express";
 import { signIn,signUp } from "../controller/security/auth.controller";

 const router = Router();

 router.post('/signIn',signIn);
 router.post('/signup', signUp);


export default router;