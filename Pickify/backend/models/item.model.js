import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        default: ""
    },
    price: {
        type:Number,
        min:0,
        required:true
    },
    discountPrice:{
        type:Number,
        min:0,
        default:0
    },
    variants: [
        {
            weight: String,
            price: Number,
            discountPrice: { type: Number, default: 0 },
            inStock: { type: Boolean, default: true }
        }
    ],
    inStock:{
        type:Boolean,
        default:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    category:{
        type:String,
        enum:[
            "Snacks",
            "Biscuits",
            "Chips",
            "Noodles",
            "Chocolate",
            "Candies",
            "Cookies",
            "Namkeen",
            "Other Snacks",
            "Beverages",
            "Dairy",
            "Bakery",
            "Cold Drinks",
            "Juices",
            "Other Beverages",
            "Ice Creams",
            "Other Dairy",
            "Other Bakery",
            "Other"
        ],
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

const Item = mongoose.model("Item", itemSchema);
export default Item;