import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }
        const shop = await Shop.create({ name, image, city, state, address, owner: req.user._id });
        await shop.populate("owner")
        return res.status(201).json({ shop });
    } catch (error) {
        return res.status(500).json({ message: `create shop error ${error}` });
    }
}

export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        return res.status(200).json({ shops });
    } catch (error) {
        return res.status(500).json({ message: `get all shops error ${error}` });
    }
}