import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


export const addItem = async (req, res) => {
    try {
        let {name, category, description, price, discountPrice, inStock, weight, variants} = req.body;
        
        if (variants && typeof variants === 'string') {
            variants = JSON.parse(variants);
        }
        
        // Handle boolean conversion if sent as string from FormData
        if (inStock === 'true') inStock = true;
        if (inStock === 'false') inStock = false;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        } else if (req.body.imageUrl) {
            image = req.body.imageUrl;
        }

        const shop = await Shop.findOne({ owner: req.userId });
        if(!shop){
            return res.status(404).json({message:"Shop not found"});
        }

        const item = await Item.create({
            name,
            image,
            price,
            discountPrice: discountPrice || 0,
            inStock: inStock !== undefined ? inStock : true,
            category,
            description,
            weight: weight || "",
            variants: variants || [],
            shop: shop._id,
        });

        shop.items.push(item._id);
        await shop.save();

        return res.status(201).json({item});
    } catch (error) {
        return res.status(500).json({ message: `add item error ${error}` });
    }
}

export const editItem = async (req, res) => {
    try {
        let {name, category, description, price, discountPrice, inStock, weight, variants} = req.body;
        
        if (variants && typeof variants === 'string') {
            variants = JSON.parse(variants);
        }
        
        // Handle boolean conversion if sent as string from FormData
        if (inStock === 'true') inStock = true;
        if (inStock === 'false') inStock = false;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        } else if (req.body.imageUrl) {
            image = req.body.imageUrl;
        }

        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({message:"Item not found"});
        }

        const shop = await Shop.findOne({ owner: req.userId });
        if(!shop || item.shop.toString() !== shop._id.toString()){
            return res.status(403).json({message:"Unauthorized"});
        }

        if(name) item.name = name;
        if(category) item.category = category;
        if(description) item.description = description;
        if(price) item.price = price;
        if(discountPrice !== undefined) item.discountPrice = discountPrice;
        if(inStock !== undefined) item.inStock = inStock;
        if(weight !== undefined) item.weight = weight;
        if(variants !== undefined) item.variants = variants;
        if(image) item.image = image;
        if(image) item.image = image;

        await item.save();
        return res.status(200).json({item});
    } catch (error) {
        return res.status(500).json({ message: `edit item error ${error}` });
    }
}

export const getItemDetails = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const shop = await Shop.findById(item.shop).select('name address city state pincode image');
        return res.status(200).json({ item, shop });
    } catch (error) {
        return res.status(500).json({ message: `get item error ${error}` });
    }
}