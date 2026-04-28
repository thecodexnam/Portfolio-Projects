import Item from "../models/item.model.js";


export const addItem = async (req, res) => {
    try {
        const{name, category, foodType, price} = req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        }

        const shop = await Shop.findById(req.user.shop);
        if(!shop){
            return res.status(404).json({message:"Shop not found"});
        }

        if(shop.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"Unauthorized"});
        }

        const item = await Item.create({
            name,
            image,
            price,
            category,
            foodType,
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
        const{name, category, foodType, price} = req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path);
        }

        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({message:"Item not found"});
        }

        if(item.shop.toString() !== req.user.shop.toString()){
            return res.status(403).json({message:"Unauthorized"});
        }

        if(name) item.name = name;
        if(category) item.category = category;
        if(foodType) item.foodType = foodType;
        if(price) item.price = price;
        if(image) item.image = image;

        await item.save();
        return res.status(200).json({item});
    } catch (error) {
        return res.status(500).json({ message: `edit item error ${error}` });
    }
}