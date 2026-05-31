import express from "express";
import { createAndUpdateShop, getShop, getAllShops, getShopById } from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = express.Router();

shopRouter.post("/create-and-update", isAuth, upload.single("image"), createAndUpdateShop);
shopRouter.get("/get", isAuth, getShop);
shopRouter.get("/all", isAuth, getAllShops);
shopRouter.get("/:id", isAuth, getShopById);

export default shopRouter;