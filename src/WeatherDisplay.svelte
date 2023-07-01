<script lang="ts">
  import { fade } from 'svelte/transition';

  export let location: string;
  export let weather: string;
  export let temperature: string;
  export let feelsLike: string;
  export let humidity: string;
  export let windSpeed: string;
  export let windDescription: string;
  export let lastUpdated: string;
  export let weatherIcon: string;
  export let currentTime: Date;
  export let isLoading: boolean;
</script>

<!-- 
  Renders the layout for the weather data, weather icon, time and date.
  This content will only be displayed if the 'isLoading' boolean is false,
  indicating that the weather data has been successfully fetched 
-->
{#if !isLoading}
  <div class="weather-data-container" transition:fade>
    <i class={weatherIcon} />
    <p>
      {currentTime.toLocaleDateString()}
      {currentTime.toLocaleTimeString()}
    </p>
    <h2>{location}</h2>
    <h1 class="temperature margin-top-bottom">{temperature}</h1>
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
  </div>
{/if}

<style>
  /* Styling */

  /* Styles for extra extra small mobile screens ≥280px first */
  .weather-data-container {
    text-align: center;
    padding: 1.7rem 1.2rem 2rem 1.2rem;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    word-spacing: 0.188rem;
    max-width: 16rem;
    height: auto;
  }

  .additional-weather-data-container {
    border: 0.092rem solid rgba(70, 70, 70, 1);
    padding: 0.4rem;
    box-sizing: border-box;
  }

  .temperature {
    position: relative;
    text-align: center;
  }

  .temperature::after {
    content: '°';
    position: absolute;
    right: 2.4rem;
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
    padding-bottom: 0.7rem;
  }

  /* Media queries */

  /* Styles for extra small screens and larger */
  @media only screen and (min-width: 320px) {
    .weather-data-container {
      padding: 2rem 1.2rem 2.3rem 1.2rem;
      max-width: 19rem;
    }

    .temperature::after {
      right: 3.6rem;
    }
  }

  /* Styles for medium screens and larger */
  @media only screen and (min-width: 768px) {
    .weather-data-container {
      max-width: 28rem;
      padding: 3rem 4rem 3.3rem 4rem;
    }

    .additional-weather-data-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .temperature::after {
      right: 4.8rem;
    }

    .margin-top-bottom {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
