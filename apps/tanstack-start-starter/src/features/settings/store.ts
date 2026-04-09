import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  notifications: boolean;
  itemsPerPage: number;
  actions: {
    setNotifications: (enabled: boolean) => void;
    setItemsPerPage: (count: number) => void;
    reset: () => void;
  };
}

const defaults = {
  notifications: true,
  itemsPerPage: 10,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      actions: {
        setNotifications: (notifications) => set({ notifications }),
        setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
        reset: () => set(defaults),
      },
    }),
    {
      name: 'app-settings-v1',
      partialize: ({ actions: _, ...state }) => state,
    }
  )
);
