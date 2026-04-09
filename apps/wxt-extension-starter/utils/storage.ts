import type { ExtensionSettings } from '../lib/types';

export const themeStorage = storage.defineItem<ExtensionSettings['theme']>('local:theme', {
  fallback: 'system',
});

export const notificationsStorage = storage.defineItem<boolean>('sync:notifications', {
  fallback: true,
});

export const syncEnabledStorage = storage.defineItem<boolean>('sync:syncEnabled', {
  fallback: false,
});

export const counterStorage = storage.defineItem<number>('local:counter', {
  fallback: 0,
});
