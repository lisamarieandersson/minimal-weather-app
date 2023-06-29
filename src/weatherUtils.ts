// Describes wind speed based on the Beaufort wind force scale
export function describeWindSpeed(speed: number): string {
  if (speed < 0.3) {
    return 'Calm';
  } else if (speed < 1.5) {
    return 'Light air';
  } else if (speed < 3.3) {
    return 'Light breeze';
  } else if (speed < 5.5) {
    return 'Gentle breeze';
  } else if (speed < 7.9) {
    return 'Moderate breeze';
  } else if (speed < 10.7) {
    return 'Fresh breeze';
  } else if (speed < 13.8) {
    return 'Strong breeze';
  } else if (speed < 17.1) {
    return 'High wind';
  } else if (speed < 20.7) {
    return 'Gale';
  } else if (speed < 24.4) {
    return 'Severe gale';
  } else if (speed < 28.4) {
    return 'Storm';
  } else if (speed < 32.6) {
    return 'Violent storm';
  } else {
    return 'Hurricane';
  }
}
