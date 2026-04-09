import { create } from 'zustand';
import { getAppState, saveAppState } from '@/services/commands';

interface SettingsStore {
  theme: string;
  sidebarDefault: boolean;
  loading: boolean;
  setTheme: (theme: string) => Promise<void>;
  setSidebarDefault: (open: boolean) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  theme: 'system',
  sidebarDefault: true,
  loading: false,

  loadSettings: async () => {
    set({ loading: true });
    try {
      const state = await getAppState();
      set({
        theme: state.theme,
        sidebarDefault: state.sidebar_open,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    const { sidebarDefault } = get();
    await saveAppState({ last_page: 'settings', theme, sidebar_open: sidebarDefault });
  },

  setSidebarDefault: async (sidebarDefault) => {
    set({ sidebarDefault });
    const { theme } = get();
    await saveAppState({ last_page: 'settings', theme, sidebar_open: sidebarDefault });
  },
}));
