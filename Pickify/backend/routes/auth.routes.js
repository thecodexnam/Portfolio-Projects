import express from 'express';
import { signOut, signUp, signIn, sendOtp, verifyOtp, resetPassword, googleAuth } from '../controllers/auth.controller.js';

const authRouter = express.Router()

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/google-auth",googleAuth)


export default authRouter;