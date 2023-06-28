<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { backgroundMapping } from './backgroundMapping';
  import { iconMapping } from './iconMapping';
  import { describeWindSpeed } from './weatherUtils';

  let location: string = '...';
  let weather: string = '...';
  let temperature: string = '...';
  let feelsLike: string = '...';
  let humidity: string = '...';
  let windSpeed: string = '...';
  let windDescription: string = '...';
  let lastUpdated: string = '...';
  let weatherIcon: string = '';
  let backgroundImage: string = '/backgrounds/background-5-multi.jpg'; // default background image
  let currentTime: Date = new Date();

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
            humidity = `${data.main.humidity}%`;
            windSpeed = `${Math.round(data.wind.speed)} m/s`;
            windDescription = describeWindSpeed(data.wind.speed);
            lastUpdated = new Date(data.dt * 1000).toLocaleString();
            lastUpdated = lastUpdated.split(':').splice(0, 2).join(':');

            let weatherIconClass = iconMapping[data.weather[0].icon];
            if (!weatherIconClass) {
              console.warn(
                `No mapping found for weather code ${data.weather[0].icon}`
              );
              weatherIconClass = 'pe-7w-cloud'; // default icon
            }
            weatherIcon = weatherIconClass;

            let backgroundImageFile = backgroundMapping[data.weather[0].icon];
            if (backgroundImageFile) {
              backgroundImage = `/backgrounds/${backgroundImageFile}`;
            } else {
              backgroundImage = '/backgrounds/background-5-multi.jpg';
            }
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  let weatherIntervalId: number;
  let timeIntervalId: number;

  onMount(() => {
    // Fetch the weather initially and every 15 minutes
    fetchWeather();
    weatherIntervalId = setInterval(fetchWeather, 900000);

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
</script>

<main
  class="flex justify-content-center align-items-center"
  style="background-image: url({backgroundImage})"
>
  <div class="weather-data-container" transition:fade>
    {#await weatherPromise}
      <p>Fetching weather data...</p>
    {:then}
      <i class={weatherIcon} />
      <p>
        {currentTime.toLocaleDateString()}
        {currentTime.toLocaleTimeString()}
      </p>
      <h2>{location}</h2>
      <h1 class="margin-top-bottom">{temperature}</h1>
      <h3 class="margin-bottom-0">{weather}</h3>
      <h4 class="margin-top">{windDescription}</h4>
      <div class="flex justify-content-center align-items-center">
        <div class="line" />
      </div>
      <div
        class="additional-weather-data-container flex column justify-content-center align-items-center"
      >
        <div class="flex row justify-content-space-between align-items-center">
          <p>Feels like {feelsLike}</p>
          <p>|</p>
          <p>Humidity {humidity}</p>
        </div>
        <div class="flex justify-content-center">
          <p>Wind speed {windSpeed}</p>
        </div>
        <div class="flex justify-content-center">
          <p>Last updated: {lastUpdated}</p>
        </div>
      </div>
    {:catch error}
      <p style="color: red">Error: {error.message}</p>
    {/await}
  </div>
</main>

<style>
  main {
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
  }

  .weather-data-container {
    text-align: center;
    padding: 2rem 1.3rem 3rem 1.3rem;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    word-spacing: 0.188rem;
    max-width: 19rem;
    height: auto;
  }

  .additional-weather-data-container {
    border: 0.092rem solid #686868;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  p {
    margin: 0.3rem;
  }

  .line {
    height: 0.15rem;
    background: #464646;
    margin-bottom: 3rem;
    width: 10.3rem;
  }

  /* Icon styling */
  [class^='pe-7w-'] {
    font-size: 4.6rem;
    color: #464646;
  }

  /* Reusable classes */

  .flex {
    display: flex;
  }

  .row {
    flex-direction: row;
  }

  .column {
    flex-direction: column;
  }

  .justify-content-space-between {
    justify-content: space-between;
  }

  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  .margin-bottom-0 {
    margin-bottom: 0;
  }

  .margin-top {
    margin-top: 0.5rem;
  }

  .margin-top-bottom {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }

  /* Tablet styles (for screens 768px and larger) */
  @media (min-width: 768px) {
  }
</style>
