import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(200).json({ user: null });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(200).json({ user: null });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(200).json({ user: null });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` });
    }
}
