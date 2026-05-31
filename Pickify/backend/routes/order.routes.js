import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { 
    placeOrder, 
    getUserOrders, 
    getShopOrders, 
    updateOrderStatus 
} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/place', isAuth, placeOrder);
orderRouter.get('/user-orders', isAuth, getUserOrders);
orderRouter.get('/shop-orders', isAuth, getShopOrders);
orderRouter.patch('/status', isAuth, updateOrderStatus);

export default orderRouter;
