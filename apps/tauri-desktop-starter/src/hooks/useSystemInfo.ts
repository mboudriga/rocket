import { useEffect, useState } from 'react';
import type { SystemInfo } from '@/services/commands';
import { getSystemInfo } from '@/services/commands';

export function useSystemInfo() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSystemInfo()
      .then(setInfo)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return { info, loading, error };
}
