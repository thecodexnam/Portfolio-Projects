import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        name: String,
        price: Number,
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Pending"
    },
    deliveryType: {
        type: String,
        enum: ["Delivery", "Self-Pickup"],
        default: "Delivery"
    },
    scheduledDate: {
        type: Date
    },
    scheduledTime: {
        type: String
    },
    address: {
        type: String,
        required: function() { return this.deliveryType === 'Delivery'; }
    },
    pincode: String,
    phone: String
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
