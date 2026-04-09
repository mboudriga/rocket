import { describe, expect, it } from 'vitest';
import { useAppStore } from './app-store';

describe('useAppStore', () => {
  it('should initialize with sidebar open', () => {
    const state = useAppStore.getState();
    expect(state.sidebarOpen).toBe(true);
  });

  it('should toggle sidebar', () => {
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);
  });
});
