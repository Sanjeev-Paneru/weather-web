export const searchCity = async (cityName: string) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching city data:", error);
    return [];
  }
};
