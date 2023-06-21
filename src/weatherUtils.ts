/**
 * Describes wind speed based on the Beaufort wind force scale
 */
export function describeWindSpeed(speed: number): string {
  if (speed < 0.3) {
    return 'Calm';
  } else if (speed < 1.5) {
    return 'Light Air';
  } else if (speed < 3.3) {
    return 'Light Breeze';
  } else if (speed < 5.5) {
    return 'Gentle Breeze';
  } else if (speed < 7.9) {
    return 'Moderate Breeze';
  } else if (speed < 10.7) {
    return 'Fresh Breeze';
  } else if (speed < 13.8) {
    return 'Strong Breeze';
  } else if (speed < 17.1) {
    return 'High Wind';
  } else if (speed < 20.7) {
    return 'Gale';
  } else if (speed < 24.4) {
    return 'Severe Gale';
  } else if (speed < 28.4) {
    return 'Storm';
  } else if (speed < 32.6) {
    return 'Violent Storm';
  } else {
    return 'Hurricane';
  }
}
