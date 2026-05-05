import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { shopId, items, totalAmount, address, pincode, phone, deliveryType, scheduledDate, scheduledTime } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            user: req.userId,
            shop: shopId,
            items,
            totalAmount,
            address: deliveryType === 'Self-Pickup' ? 'Self-Pickup at Store' : address,
            pincode,
            phone,
            deliveryType,
            scheduledDate,
            scheduledTime
        });

        return res.status(201).json({ 
            success: true, 
            message: "Order placed successfully", 
            order 
        });
    } catch (error) {
        return res.status(500).json({ message: `Place order error: ${error.message}` });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .populate("shop", "name image")
            .sort({ createdAt: -1 });
        
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: `Get user orders error: ${error.message}` });
    }
};

export const getShopOrders = async (req, res) => {
    try {
        const shop = await Shop.findOne({ owner: req.userId });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        const orders = await Order.find({ shop: shop._id })
            .populate("user", "name email phone")
            .sort({ createdAt: -1 });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: `Get shop orders error: ${error.message}` });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const shop = await Shop.findOne({ owner: req.userId });
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.shop.toString() !== shop._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this order" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        return res.status(500).json({ message: `Update status error: ${error.message}` });
    }
};
