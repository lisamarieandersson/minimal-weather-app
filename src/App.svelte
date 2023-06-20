<script lang="ts">
  import { onMount } from 'svelte';

  let location: string = 'Loading...';
  let weather: string = 'Loading...';
  let temperature: string = 'Loading...';
  let feelsLike: string = 'Loading...';

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  let weatherPromise: Promise<void> | null = null;

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

        weatherPromise = fetch(url, options)
          .then((response) => response.json())
          .then((data) => {
            location = `${data.location.name}, ${data.location.country}`;
            weather = data.current.condition.text;
            temperature = `${data.current.temp_c}°C`;
            feelsLike = `${data.current.feelslike_c}°C`;
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  });
</script>

<main>
  <h1>Weather App</h1>
  {#await weatherPromise}
    <p>Fetching weather data...</p>
  {:then}
    <h2>Location: {location}</h2>
    <h2>Weather: {weather}</h2>
    <h2>Temperature: {temperature}</h2>
    <h2>Feels Like: {feelsLike}</h2>
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
  {/await}
</main>
