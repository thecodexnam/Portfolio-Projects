import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../config";
import { clearUser, setError, setLoading, setUser } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      try {
        const { data } = await axios.get(`${serverUrl}/api/user/current-user`, {
          withCredentials: true,
        });

        console.log("Logged in user:", data);
        dispatch(setUser(data));
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          dispatch(clearUser());
          return;
        }

        dispatch(setError(error.response?.data?.message || error.message));
      }
    };

    fetchUser();
  }, [dispatch]);

  return authState;
};

export default useCurrentUser;
