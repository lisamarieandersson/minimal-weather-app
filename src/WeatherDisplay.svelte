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
  </div>
{/if}

<style>
  .weather-data-container {
    text-align: center;
    padding: 2rem 1.3rem 2.3rem 1.3rem;
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
    padding-bottom: 0.5rem;
  }

  /* Media queries */

  /* Larger than tablet */
  @media (min-width: 750px) {
    .weather-data-container {
      max-width: 28rem;
      padding: 3rem 4rem 3.3rem 4rem;
    }

    .additional-weather-data-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .margin-top-bottom {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>
