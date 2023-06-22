<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { iconMapping } from './iconMapping';
  import { describeWindSpeed } from './weatherUtils';

  let location: string = 'Loading...';
  let weather: string = 'Loading...';
  let temperature: string = 'Loading...';
  let feelsLike: string = 'Loading...';
  let windSpeed: string = 'Loading...';
  let windDescription: string = 'Loading...';
  let lastUpdated: string = 'Loading...';
  let weatherIcon: string = '';

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  let weatherPromise: Promise<void> | null = null;

  // Fetch weather function
  async function fetchWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        weatherPromise = fetch(url)
          .then((response) => response.json())
          .then((data) => {
            location = `${data.name}, ${data.sys.country}`;
            weather = `${data.weather[0].description
              .charAt(0)
              .toUpperCase()}${data.weather[0].description.slice(1)}`;
            temperature = `${Math.round(data.main.temp)}°C`;
            feelsLike = `${Math.round(data.main.feels_like)}°C`;
            windSpeed = `${Math.round(data.wind.speed)} m/s`;
            windDescription = describeWindSpeed(data.wind.speed);
            lastUpdated = new Date(data.dt * 1000).toLocaleString();

            let weatherIconClass = iconMapping[data.weather[0].icon];
            if (!weatherIconClass) {
              console.warn(
                `No mapping found for weather code ${data.weather[0].icon}`
              );
              weatherIconClass = 'pe-7w-cloud'; // default icon
            }
            weatherIcon = weatherIconClass; // assign the class to weatherIcon
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  let intervalId: number;

  onMount(() => {
    fetchWeather(); // initial fetch
    intervalId = setInterval(fetchWeather, 90000); // fetch weather data every 15 minutes
  });

  onDestroy(() => {
    clearInterval(intervalId); // clean up interval on component unmount
  });
</script>

<main>
  <h1>Weather App</h1>
  {#await weatherPromise}
    <p>Fetching weather data...</p>
  {:then}
    <i class={weatherIcon} />
    <h2>{location}</h2>
    <h2>{temperature}</h2>
    <h2>{weather}</h2>
    <h2>{windDescription}</h2>
    <h2>Feels like: {feelsLike}</h2>
    <h2>Wind: {windSpeed}</h2>
    <h2>Last updated: {lastUpdated}</h2>
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
  {/await}
</main>

<style>
  /* Icon styling */
  [class^='pe-7w-'] {
    font-size: 6rem;
    font-weight: 100;
  }
</style>
