import { Haptics, ImpactStyle } from '@capacitor/haptics';

export async function impactLight() {
  await Haptics.impact({ style: ImpactStyle.Light });
}

export async function impactMedium() {
  await Haptics.impact({ style: ImpactStyle.Medium });
}

export async function impactHeavy() {
  await Haptics.impact({ style: ImpactStyle.Heavy });
}

export async function vibrate() {
  await Haptics.vibrate();
}
