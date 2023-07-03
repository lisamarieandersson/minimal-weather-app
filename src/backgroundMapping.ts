/**
 * Mapping to display the chosen background image based
 * on the weather condition code received from the API
 */
export const backgroundMapping = {
  '01d': 'background-8-blue.webp', // clear sky (day)
  '01n': 'background-5-blush.webp', // clear sky (night)
  '02d': 'background-6-blue.webp', // few clouds (day)
  '02n': 'background-5-multi.webp', // few clouds (night)
  '03d': 'background-7-blue.webp', // scattered clouds (day)
  '03n': 'background-4-multi.webp', // scattered clouds (night)
  '04d': 'background-11-blue.webp', // broken clouds (day)
  '04n': 'background-17-multi.webp', // broken clouds (night)
  '09d': 'background-9-grey.webp', // shower rain / drizzle (day)
  '09n': 'background-1-multi.webp', // shower rain / drizzle (night)
  '10d': 'background-17-grey.webp', // rain (day)
  '10n': 'background-3-multi.webp', // rain (night)
  '11d': 'background-11-grey.webp', // thunderstorm (day)
  '11n': 'background-16-multi.webp', // thunderstorm (night)
  '13d': 'background-12-blue.webp', // snow (day)
  '13n': 'background-14-multi.webp', // snow (night)
  '50d': 'background-4-green.webp', // atmosphere like mist, fog etc. (day)
  '50n': 'background-4-lavender.webp', // atmosphere like mist, fog etc. (night)
};
