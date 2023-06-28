<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import WeatherDisplay from './WeatherDisplay.svelte';
  import { backgroundMapping } from './backgroundMapping';
  import { iconMapping } from './iconMapping';
  import { fetchWeather } from './weatherAPI';
  import { describeWindSpeed } from './weatherUtils';

  interface WeatherData {
    name: string;
    sys: {
      country: string;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    dt: number;
  }

  let backgroundImage: string = '/backgrounds/background-5-multi.jpg'; // default background image
  let currentTime: Date = new Date();
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

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  let weatherPromise: Promise<void> | null = null;
  let weatherIntervalId: number;
  let timeIntervalId: number;

  onMount(() => {
    // Fetch the weather initially and every 15 minutes
    weatherPromise = updateWeather();
    weatherIntervalId = setInterval(() => {
      weatherPromise = updateWeather();
    }, 900000);

    // Update the time every second
    timeIntervalId = setInterval(() => {
      currentTime = new Date();
    }, 1000);
  });

  onDestroy(() => {
    // Clear both intervals on component unmount
    clearInterval(weatherIntervalId);
    clearInterval(timeIntervalId);
  });

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
              resolve();
            } catch (error) {
              console.error(error.message);
              reject(error);
            }
          },
          reject,
          { timeout: 5000 }
        );
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

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
      temperature: `${Math.round(data.main.temp)}°C`,
      feelsLike: `${Math.round(data.main.feels_like)}°C`,
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

<main
  class="flex justify-content-center align-items-center"
  style="background-image: url({backgroundImage})"
>
  {#await weatherPromise}
    <div class="loader"><LoadingSpinner /></div>
  {:then}
    <WeatherDisplay {currentTime} {...weatherData} />
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
  {/await}
</main>

<style>
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
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
