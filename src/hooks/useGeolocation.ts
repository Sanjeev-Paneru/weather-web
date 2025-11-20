import { useEffect, useState } from "react";

interface Geolocation {
  lat: number;
  lon: number;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      // Wrap in setTimeout to avoid calling setState synchronously in effect
      setTimeout(() =>
        setError("Geolocation is not supported by this browser.")
      );
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lon: longitude });
    };

    const handleError = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

export default useGeolocation;
