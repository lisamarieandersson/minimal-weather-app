<script lang="ts">
  import { onMount } from 'svelte';

  let location: string | null = null;
  let weather: string | null = null;
  let temperature: number | null = null;

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const locationMapping = {
    'Goteborg, Vastra Gotaland, Sweden': 'Göteborg, Västra Götaland, Sweden',
    // Will add more mappings for other cities and regions?
  };

  onMount(async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lon}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          },
        };

        fetch(url, options)
          .then((response) => response.json())
          .then((data) => {
            const asciiLocation = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
            location = locationMapping[asciiLocation] || asciiLocation;
            weather = data.current.condition.text;
            temperature = data.current.temp_c;
          })
          .catch((error) => console.error('Error:', error));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  });
</script>

<main>
  <h1>Weather App</h1>
  <h2>Location: {location}</h2>
  <h2>Weather: {weather}</h2>
  <h2>Temperature: {temperature}°C</h2>
</main>
