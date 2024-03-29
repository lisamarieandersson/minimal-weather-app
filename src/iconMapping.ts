/**
 * Mapping to display the right icon based on the
 * weather condition code received from the API
 */
export const iconMapping = {
  '01d': 'pe-7w-sun', // clear sky (day)
  '01n': 'pe-7w-moon', // clear sky (night)
  '02d': 'pe-7w-cloud-sun', // few clouds (day)
  '02n': 'pe-7w-cloud-moon', // few clouds (night)
  '03d': 'pe-7w-cloud', // scattered clouds (day)
  '03n': 'pe-7w-cloud-moon', // scattered clouds (night)
  '04d': 'pe-7w-cloud', // broken clouds (day)
  '04n': 'pe-7w-cloud-moon', // broken clouds (night)
  '09d': 'pe-7w-drizzle', // shower rain / drizzle (day)
  '09n': 'pe-7w-drizzle-moon', // shower rain / drizzle (night)
  '10d': 'pe-7w-rain-alt', // rain (day)
  '10n': 'pe-7w-rain-alt-moon', // rain (night)
  '11d': 'pe-7w-lightning', // thunderstorm (day)
  '11n': 'pe-7w-lightning-moon', // thunderstorm (night)
  '13d': 'pe-7w-snow-alt', // snow (day)
  '13n': 'pe-7w-snow-alt-moon', // snow (night)
  '50d': 'pe-7w-fog', // atmosphere like mist, fog etc. (day)
  '50n': 'pe-7w-fog-moon', // atmosphere like mist, fog etc. (night)
};
