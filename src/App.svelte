<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import WeatherDisplay from './WeatherDisplay.svelte';
  import { backgroundMapping } from './backgroundMapping';
  import { iconMapping } from './iconMapping';
  import { fetchWeather } from './weatherAPI';
  import { type WeatherData } from './weatherTypes';
  import { describeWindSpeed } from './weatherUtils';

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  let weatherPromise: Promise<void> | null = null;
  let weatherIntervalId: number;
  let timeIntervalId: number;
  let geolocationError: string | null = null;

  let isLoading = true;
  let currentTime: Date = new Date();

  let backgroundImage: string = '/backgrounds/background-5-multi.jpg'; // default background image
  let weatherData = {
    location: '',
    weather: '',
    temperature: '',
    feelsLike: '',
    humidity: '',
    windSpeed: '',
    windDescription: '',
    lastUpdated: '',
    weatherIcon: '',
  };

  onMount(() => {
    // Fetches the weather initially and every 15 minutes
    weatherPromise = updateWeather();
    weatherIntervalId = setInterval(() => {
      weatherPromise = updateWeather();
    }, 900000);

    // Updates the time every second
    timeIntervalId = setInterval(() => {
      currentTime = new Date();
    }, 1000);
  });

  onDestroy(() => {
    // Clears both intervals on component unmount
    clearInterval(weatherIntervalId);
    clearInterval(timeIntervalId);
  });

  /**
   * Retrieves the current geolocation data
   * Fetches weather information corresponding to that location
   * Updates the weather based on the response from the API
   */
  async function updateWeather() {
    if ('geolocation' in navigator) {
      return new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const data = await fetchWeather(lat, lon, apiKey);
              const mappedData = mapWeatherData(data);
              weatherData = { ...weatherData, ...mappedData };
              isLoading = false;
              resolve();
            } catch (error) {
              geolocationError = `Failed to fetch weather data: ${error.message}`;
              console.error(error.message);
              reject(error);
            }
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                geolocationError =
                  'Location access denied by user. Please enable geolocation.';
                break;
              case error.POSITION_UNAVAILABLE:
                geolocationError =
                  'Location information is unavailable. Please try again.';
                break;
              case error.TIMEOUT:
                geolocationError =
                  'The request to get user location timed out. Please try again.';
                break;
              default:
                geolocationError =
                  'An unknown error occurred while trying to fetch location.';
                break;
            }
            reject(error);
          },
          { timeout: 5000 }
        );
      });
    } else {
      geolocationError = 'Geolocation is not supported by this browser.';
    }
  }

  // Formats and maps the raw weather data from the API according to the structure of the app
  function mapWeatherData(data: WeatherData) {
    let weatherIconClass = iconMapping[data.weather[0].icon] || 'pe-7w-cloud';
    let backgroundImageFile =
      backgroundMapping[data.weather[0].icon] ||
      '/backgrounds/background-5-multi.jpg';
    backgroundImage = `/backgrounds/${backgroundImageFile}`;

    return {
      location: `${data.name}, ${data.sys.country}`,
      weather: `${data.weather[0].description
        .charAt(0)
        .toUpperCase()}${data.weather[0].description.slice(1)}`,
      temperature: `${Math.round(data.main.temp)}`,
      feelsLike: `${Math.round(data.main.feels_like)}°`,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${Math.round(data.wind.speed)} m/s`,
      windDescription: describeWindSpeed(data.wind.speed),
      lastUpdated: new Date(data.dt * 1000)
        .toLocaleString()
        .split(':')
        .splice(0, 2)
        .join(':'),
      weatherIcon: weatherIconClass,
    };
  }
</script>

<!--
  Checks for geolocation errors and displays an error message to the user if there are any
  If no geolocation errors, displays a loading spinner while waiting for the weather data to load
  Renders the WeatherDisplay component with the fetched data once it's available 
  Displays an error message if the weather data fetch fails
-->
<main
  class="flex justify-content-center align-items-center"
  style="background-image: url({backgroundImage})"
>
  {#if geolocationError}
    <p style="color: red">{geolocationError}</p>
  {:else}
    {#await weatherPromise}
      <div class="loader"><LoadingSpinner /></div>
    {:then}
      <WeatherDisplay {currentTime} {isLoading} {...weatherData} />
    {/await}
  {/if}
</main>

<style>
  /* Styling */
  main {
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    overflow-y: scroll;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
