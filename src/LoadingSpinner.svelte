<!-- Loading spinner to give the user feedback that the weather data is being loaded  -->

<div class="loader" />

<style>
  .loader {
    border: 1rem solid #f3f3f3;
    border-radius: 50%;
    border-top: 1rem solid #ead3cd;
    width: 6.75rem;
    height: 6.75rem;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
