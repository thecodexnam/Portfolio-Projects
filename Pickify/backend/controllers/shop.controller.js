import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createAndUpdateShop = async (req, res) => {
  try {
    const { name, city, state, address, pincode } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });
    let isNew = false;

    if (!shop && !image) {
      if (!req.file) {
        return res.status(400).json({ message: "Image upload failed: req.file is undefined. Multer did not receive the file." });
      } else {
        return res.status(400).json({ message: "Image upload failed: Cloudinary upload returned null." });
      }
    }

    if (!shop) {
      isNew = true;
      shop = await Shop.create({
        name,
        image,
        city,
        state,
        address,
        pincode,
        owner: req.userId,
      });
    } else {
      const updateData = {};
      if (name) updateData.name = name;
      if (city) updateData.city = city;
      if (state) updateData.state = state;
      if (address) updateData.address = address;
      if (pincode) updateData.pincode = pincode;
      if (image) updateData.image = image;

      shop = await Shop.findByIdAndUpdate(shop._id, updateData, { new: true });
    }

    await shop.populate("owner");
    return res.status(isNew ? 201 : 200).json({ shop });
  } catch (error) {
    return res.status(500).json({ message: `create shop error ${error}` });
  }
};


export const getShop = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId }).populate("items");
        if (!shop) {
            return res.status(200).json({message: "No shop created", shop: null });
        }
        return res.status(200).json({ shop });
    } catch (error) {
        return res.status(500).json({ message: `get shop error ${error}` });
    }
}

export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate("owner", "name email");
        return res.status(200).json({ shops });
    } catch (error) {
        return res.status(500).json({ message: `get all shops error ${error}` });
    }
}

export const getShopById = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findById(id).populate("items");
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        return res.status(200).json({ shop });
    } catch (error) {
        return res.status(500).json({ message: `get shop by id error ${error}` });
    }
}