import jwt from 'jsonwebtoken'

const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({message:"Token not found"})
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(401).json({message:"User not found"})
        }
        req.userId = decodeToken.userId
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"})
    }
} 

export default isAuth
