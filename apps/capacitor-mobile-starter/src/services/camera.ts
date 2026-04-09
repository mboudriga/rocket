import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export async function takePhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt,
    allowEditing: false,
  });
  return image;
}

export async function checkCameraPermissions() {
  const status = await Camera.checkPermissions();
  if (status.camera === 'prompt' || status.photos === 'prompt') {
    return Camera.requestPermissions();
  }
  return status;
}
