/**
 * Mapping to display the chosen background image based
 * on the weather condition code received from the API
 */
export const backgroundMapping = {
  '01d': 'background-8-blue.jpg', // clear sky (day)
  '01n': 'background-5-blush.jpg', // clear sky (night)
  '02d': 'background-6-blue.jpg', // few clouds (day)
  '02n': 'background-5-multi.jpg', // few clouds (night)
  '03d': 'background-7-blue.jpg', // scattered clouds (day)
  '03n': 'background-4-multi.jpg', // scattered clouds (night)
  '04d': 'background-11-blue.jpg', // broken clouds (day)
  '04n': 'background-17-multi.jpg', // broken clouds (night)
  '09d': 'background-9-grey.jpg', // shower rain / drizzle (day)
  '09n': 'background-1-multi.jpg', // shower rain / drizzle (night)
  '10d': 'background-17-grey.jpg', // rain (day)
  '10n': 'background-3-multi.jpg', // rain (night)
  '11d': 'background-11-grey.jpg', // thunderstorm (day)
  '11n': 'background-16-multi.jpg', // thunderstorm (night)
  '13d': 'background-12-blue.jpg', // snow (day)
  '13n': 'background-14-multi.jpg', // snow (night)
  '50d': 'background-4-green.jpg', // atmosphere like mist, fog etc. (day)
  '50n': 'background-4-lavender.jpg', // atmosphere like mist, fog etc. (night)
};
