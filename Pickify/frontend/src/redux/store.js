import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userSlice';
import ownerReducer from './OwnerSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        owner: ownerReducer,
        cart: cartReducer,
    },
});

export default store;