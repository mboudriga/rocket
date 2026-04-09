import { useCallback, useEffect, useState } from 'react';

import { SearchDialog } from './SearchDialog';

/** Global search wrapper — rendered in the preview decorator */
export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    // 1. Cmd+K / Ctrl+K in the preview frame (capture phase)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        e.stopPropagation();
        openSearch();
      }
    };

    // 2. postMessage from manager frame
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'rocket:open-search') {
        openSearch();
      }
    };

    // 3. Custom event from WelcomeSearch click
    const handleCustom = () => openSearch();

    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('message', handleMessage);
    window.addEventListener('rocket:open-search', handleCustom);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('rocket:open-search', handleCustom);
    };
  }, [openSearch]);

  return <SearchDialog open={open} onOpenChange={setOpen} />;
};
