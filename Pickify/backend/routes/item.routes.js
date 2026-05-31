import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { addItem, editItem, getItemDetails } from '../controllers/item.controller.js';
import { upload } from '../middlewares/multer.js';

const itemRouter = express.Router();


itemRouter.post('/add-item', isAuth, upload.single("image"), addItem);
itemRouter.put('/edit-item/:id', isAuth, upload.single("image"), editItem);
itemRouter.get('/:id', getItemDetails);

export default itemRouter;