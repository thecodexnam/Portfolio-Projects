import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../config";
import { setCity } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const apikey=import.meta.env.VITE_GEOAPIFY_API_KEY
  const {userData, city} = useSelector(state=>state.auth)
  
  useEffect(() => {
    // Only fetch city if user is logged in and we don't already have the city
    if (userData && !city) {
      console.log("Fetching location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log("Coords:", latitude, longitude);
            const result = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
            );

            if (result.data.results && result.data.results.length > 0) {
              const res = result.data.results[0];
              console.log("Full Geoapify response for debugging:", res);

              // Extract specific area (suburb, neighborhood, town, etc.)
              const area = res.suburb || res.neighbourhood || res.quarter || res.town || res.village || res.hamlet;
              // Extract broad area (city, county, state)
              const city = res.city || res.municipality || res.county || res.state;

              let locationName = "";
              if (area && city && area !== city) {
                locationName = `${area}, ${city}`;
              } else {
                locationName = area || city || res.formatted?.split(",")[0] || "Unknown Location";
              }

              console.log("Final Location Name:", locationName);
              dispatch(setCity(locationName));
            } else {
              console.log("No results found in Geoapify response");
              dispatch(setCity("Location Not Found"));
            }
          } catch (error) {
            console.log("Error fetching city from Geoapify:", error);
            dispatch(setCity("Fetch Error"));
          }
        },
        (error) => {
          console.log("Geolocation error:", error);
          let errorMsg = "Location Blocked";
          if (error.code === 2) errorMsg = "Position Unavailable";
          if (error.code === 3) errorMsg = "Timeout";
          dispatch(setCity(errorMsg));
        }
      );
    }
  }, [userData, city, dispatch, apikey]);

}
export default useGetCity;
