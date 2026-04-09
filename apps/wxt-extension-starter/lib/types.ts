export interface ExtensionSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  syncEnabled: boolean;
}

export interface TabInfo {
  id: number | undefined;
  title: string;
  url: string;
  favIconUrl: string | undefined;
}
