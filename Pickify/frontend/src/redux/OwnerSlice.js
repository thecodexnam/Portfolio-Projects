import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShop: null,
        error: null,
    },
    reducers: {
        setMyShopData: (state, action) => {
            state.myShop = action.payload;
        },
        clearMyShopData: (state) => {
            state.myShop = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setMyShopData, clearMyShopData, setError } = ownerSlice.actions;
export default ownerSlice.reducer;

