import { Geolocation } from '@capacitor/geolocation';

export async function getCurrentPosition() {
  const position = await Geolocation.getCurrentPosition();
  return position;
}

export async function checkLocationPermissions() {
  const status = await Geolocation.checkPermissions();
  if (status.location === 'prompt') {
    return Geolocation.requestPermissions();
  }
  return status;
}
