// Fetches the current weather from the API
export async function fetchWeather(lat: number, lon: number, apiKey: string) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Error fetching weather data.');
  }
}
