import { useState } from "react";
import axios from "axios";

/**
 * useCurrentLocation
 * Fetches the user's current GPS position and reverse-geocodes it via Geoapify
 * to return structured address fields: address, pincode, city, state.
 *
 * Returns:
 *  - fetchLocation(): call this to trigger the geolocation prompt
 *  - locationLoading: boolean, true while fetching
 *  - locationError: string | null, error message if something went wrong
 */
const useCurrentLocation = () => {
  const apikey = import.meta.env.VITE_GEOAPIFY_API_KEY;
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        reject("unsupported");
        return;
      }

      setLocationLoading(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const result = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
            );

            if (result.data.results && result.data.results.length > 0) {
              const res = result.data.results[0];

              // Build human-readable street address
              const streetParts = [
                res.housenumber,
                res.street,
                res.suburb || res.neighbourhood || res.quarter,
              ].filter(Boolean);
              const address = streetParts.length > 0
                ? streetParts.join(", ")
                : res.formatted?.split(",").slice(0, 2).join(",").trim() || "";

              const pincode = res.postcode || "";
              const city    = res.city || res.municipality || res.county || "";
              const state   = res.state || "";

              setLocationLoading(false);
              resolve({ address, pincode, city, state });
            } else {
              setLocationError("Could not determine your location.");
              setLocationLoading(false);
              reject("no_results");
            }
          } catch (err) {
            setLocationError("Failed to fetch location details.");
            setLocationLoading(false);
            reject(err);
          }
        },
        (err) => {
          let msg = "Location access was denied.";
          if (err.code === 2) msg = "Position unavailable. Try again.";
          if (err.code === 3) msg = "Location request timed out.";
          setLocationError(msg);
          setLocationLoading(false);
          reject(msg);
        },
        { timeout: 10000 }
      );
    });
  };

  return { fetchLocation, locationLoading, locationError };
};

export default useCurrentLocation;
