import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../config";
import { clearMyShopData, setError, setMyShopData } from "../redux/OwnerSlice";


function useGetMyShop(){
    const dispatch = useDispatch();
    const myShop = useSelector((state) => state.owner.myShop);

    useEffect(() => {
        const fetchShop = async () => {

            try {
                const { data } = await axios.get(`${serverUrl}/api/shop/get`, {
                    withCredentials: true,
                });

                if (data.shop) {
                    dispatch(setMyShopData(data.shop));
                } else {
                    dispatch(clearMyShopData());
                }
            } catch (error) {
                if (error.response?.status === 400 || error.response?.status === 401) {
                    dispatch(clearMyShopData());
                    return;
                }

                dispatch(setError(error.response?.data?.message || error.message));
            }
        };

        fetchShop();
    }, [dispatch]);

    return { myShop };
}
export default useGetMyShop;