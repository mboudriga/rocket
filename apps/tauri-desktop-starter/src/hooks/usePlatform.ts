import { useEffect, useState } from 'react';

const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

export function usePlatform() {
  const [os, setOs] = useState<string>('windows');

  useEffect(() => {
    if (!isTauri) return;
    import('@tauri-apps/plugin-os').then(({ platform }) => {
      setOs(platform());
    });
  }, []);

  return os;
}
