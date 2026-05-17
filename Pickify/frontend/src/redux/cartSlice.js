import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        shopId: null,
        totalAmount: 0,
        totalQuantity: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const { item, shopId, selectedVariant } = action.payload;
            
            // If adding from a different shop, clear the cart first
            if (state.shopId && state.shopId !== shopId) {
                state.items = [];
                state.totalAmount = 0;
                state.totalQuantity = 0;
            }
            
            state.shopId = shopId;
            
            const itemPrice = selectedVariant 
                ? (selectedVariant.discountPrice > 0 ? selectedVariant.discountPrice : selectedVariant.price)
                : (item.discountPrice > 0 ? item.discountPrice : item.price);
            
            const itemWeight = selectedVariant ? selectedVariant.weight : item.weight;
            
            // Unique key for cart items: ID + weight (to support variants)
            const cartItemKey = `${item._id}-${itemWeight}`;
            
            const existingItem = state.items.find(i => i.cartKey === cartItemKey);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    id: item._id,
                    cartKey: cartItemKey,
                    name: item.name,
                    price: itemPrice,
                    weight: itemWeight,
                    image: item.image,
                    quantity: 1
                });
            }
            
            state.totalQuantity += 1;
            state.totalAmount += itemPrice;
        },
        removeFromCart: (state, action) => {
            const cartKey = action.payload;
            const existingItem = state.items.find(i => i.cartKey === cartKey);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(i => i.cartKey !== cartKey);
            }
            
            if (state.items.length === 0) {
                state.shopId = null;
            }
        },
        updateQuantity: (state, action) => {
            const { cartKey, quantity } = action.payload;
            const existingItem = state.items.find(i => i.cartKey === cartKey);
            if (existingItem) {
                const diff = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalQuantity += diff;
                state.totalAmount += existingItem.price * diff;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.shopId = null;
            state.totalAmount = 0;
            state.totalQuantity = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
