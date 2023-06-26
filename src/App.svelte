<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { backgroundMapping } from './backgroundMapping';
  import { iconMapping } from './iconMapping';
  import { describeWindSpeed } from './weatherUtils';

  let location: string = 'Loading...';
  let weather: string = 'Loading...';
  let temperature: string = 'Loading...';
  let feelsLike: string = 'Loading...';
  let humidity: string = 'Loading...';
  let windSpeed: string = 'Loading...';
  let windDescription: string = 'Loading...';
  let lastUpdated: string = 'Loading...';
  let weatherIcon: string = '';
  let backgroundImage: string = '/backgrounds/background-5-multi.jpg';
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

            let weatherIconClass = iconMapping[data.weather[0].icon];
            if (!weatherIconClass) {
              console.warn(
                `No mapping found for weather code ${data.weather[0].icon}`
              );
              weatherIconClass = 'pe-7w-cloud'; // default icon
            }
            weatherIcon = weatherIconClass; // assign the class to weatherIcon

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

<main style="background-image: url({backgroundImage})">
  <div class="weather-info-container" transition:fade>
    {#await weatherPromise}
      <p>Fetching weather data...</p>
    {:then}
      <i class={weatherIcon} />
      <p>
        {currentTime.toLocaleDateString()}
        {currentTime.toLocaleTimeString()}
      </p>
      <h2>{location}</h2>
      <h1>{temperature}</h1>
      <h3>{weather}</h3>
      <h4>{windDescription}</h4>
      <div class="line-container">
        <div class="line" />
      </div>
      <div class="additional-info-container">
        <div class="additional-info-row-1">
          <p>Feels like {feelsLike} | Humidity {humidity}</p>
        </div>
        <div class="additional-info-row-2">
          <p>Windspeed {windSpeed}</p>
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .weather-info-container {
    text-align: center;
    padding: 4rem;
    max-width: 32rem;
    background: rgba(255, 255, 255, 0.5);
    line-height: 1.5;
  }

  .additional-info-container {
    border: 0.092rem solid #686868;
    padding: 0.5rem 2.2rem 0.5rem 2.2rem;
  }

  .additional-info-row-1 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    word-spacing: 0.188rem;
  }

  .line-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line {
    height: 0.15rem;
    background: #464646;
    margin-bottom: 3rem;
    width: 10rem;
  }

  /* Icon styling */
  [class^='pe-7w-'] {
    font-size: 4rem;
    color: #464646;
  }
</style>
