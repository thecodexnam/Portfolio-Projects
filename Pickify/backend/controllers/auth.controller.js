import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";


//SignUp Route
export const signUp = async (req,res)=>{
    try {
        let {fullName,email,password,mobile,role} = req.body;
        email = email.toLowerCase().trim();
        const user = await User.findOne({email})
            if(user){
                return res.status(400).json({message:"User Already Exist."})
            }
            if(!password || password.length<6){
                return res.status(400).json({message:"Password must be atleast 6 chracters"})
            }
            if(mobile.length<10){
                return res.status(400).json({message:"Mobile number must be atleast 10 digits"})
            }

            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                fullName,
                email,
                password:hashedPassword,
                mobile,
                role
            })
            
            const token = await genToken(newUser._id)
            res.cookie("token",token,{
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60,
                httpOnly:true
            })

            return res.status(201).json(newUser)
        
    } catch (error) {
        return res.status(500).json(`sign up error ${error}`)
    }
}

//SignIn Route
export const signIn = async (req,res)=>{
    try {
        let {email,password} = req.body;
        email = email.toLowerCase().trim();
        const user = await User.findOne({email})

            //Check User
            if(!user){
                return res.status(400).json({message:"User does not exist"})
            }

            //Check Password
            const matchPw = await bcrypt.compare(password, user.password);
            if(!matchPw){
                return res.status(400).json({message:"Incorrect Password"})
            }
            
            //Generate Token            
            const token = await genToken(user._id)
            res.cookie("token",token,{
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000,
                httpOnly:true
            })

            return res.status(200).json({message:"User Login Successfully", user})
        
    } catch (error) {
        return res.status(500).json(`sign In error ${error}`)
    }
}

//SignOut Route
export const signOut = async (req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"User LogOut Successfully"})        
    } catch (error) {
        return res.status(500).json(`sign Out error ${error}`)
    }
}

//Send OTP Route
export const sendOtp = async (req,res) =>{
    try {
        const{email}=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpire = Date.now()+5*60*1000;
        user.isOtpVerified = false;
        await user.save()
        try {
            await sendOtpMail(email,otp);
            return res.status(200).json({message:"OTP send Successfully"})
        } catch (mailError) {
            return res.status(500).json({message:"Failed to send OTP email. Please check your email configuration.", error: mailError.message})
        }
    } catch (error) {
        return res.status(500).json(`send OTP error ${error}`)
    }
}

//Verify OTP Route
export const verifyOtp = async (req,res) =>{
    try {
        const{email,otp} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        if(user.resetOtp !== otp){
            return res.status(400).json({message:"Invalid OTP"})
        }
        if(user.otpExpire < Date.now()){
            return res.status(400).json({message:"OTP Expired"})
        }
        user.isOtpVerified = true;
        await user.save()
        return res.status(200).json({message:"OTP Verified Successfully"})
    } catch (error) {
        return res.status(500).json(`verify OTP error ${error}`)
    }
}

//Reset Password Route
export const resetPassword = async (req,res) =>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        if(!user.isOtpVerified){
            return res.status(400).json({message:"OTP not verified"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword;
        user.resetOtp = null;
        user.otpExpire = null;
        user.isOtpVerified = false;
        await user.save()
        return res.status(200).json({message:"Password Reset Successfully"})
    } catch (error) {
        return res.status(500).json(`reset password error ${error}`)
    }
}

//Google SignUp Route
export const googleAuth = async (req,res) =>{
    try {
        let {email,mobile,fullName,role} = req.body;
        email = email.toLowerCase().trim();
        let user = await User.findOne({email})
        
        if(!user){
            // If user doesn't exist and no mobile is provided (SignIn page), return error
            if (!mobile) {
                return res.status(404).json({message: "Account not found. Please Sign-Up first."})
            }

           user = await User.create({
            fullName,
            mobile,
            email,
            role: role || "user"
           })
        }

        const token = await genToken(user._id)
        if (!token) {
            throw new Error("Failed to generate token");
        }

        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json(user)

    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({message: `Google Auth error`, error: error.message})
    }
}
