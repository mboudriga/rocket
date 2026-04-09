import { create } from 'zustand';
import { clearAll, getItem, setItem } from '@/services/preferences';

interface SettingsStore {
  theme: string;
  loading: boolean;
  loadSettings: () => Promise<void>;
  setTheme: (theme: string) => Promise<void>;
  clearAllData: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  theme: 'system',
  loading: false,

  loadSettings: async () => {
    set({ loading: true });
    try {
      const raw = await getItem('settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        set({ theme: parsed.theme ?? 'system', loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    await setItem('settings', JSON.stringify({ theme }));
  },

  clearAllData: async () => {
    await clearAll();
    set({ theme: 'system' });
  },
}));
