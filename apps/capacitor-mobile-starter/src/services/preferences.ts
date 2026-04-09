import { Preferences } from '@capacitor/preferences';

export async function setItem(key: string, value: string) {
  await Preferences.set({ key, value });
}

export async function getItem(key: string) {
  const { value } = await Preferences.get({ key });
  return value;
}

export async function removeItem(key: string) {
  await Preferences.remove({ key });
}

export async function getAllKeys() {
  const { keys } = await Preferences.keys();
  return keys;
}

export async function clearAll() {
  await Preferences.clear();
}
