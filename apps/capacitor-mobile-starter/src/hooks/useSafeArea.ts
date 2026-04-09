import { useEffect, useState } from 'react';

function readInsets() {
  const style = getComputedStyle(document.documentElement);
  return {
    top: parseFloat(style.getPropertyValue('--safe-area-inset-top')) || 0,
    bottom: parseFloat(style.getPropertyValue('--safe-area-inset-bottom')) || 0,
    left: parseFloat(style.getPropertyValue('--safe-area-inset-left')) || 0,
    right: parseFloat(style.getPropertyValue('--safe-area-inset-right')) || 0,
  };
}

export function useSafeArea() {
  const [insets, setInsets] = useState(readInsets);

  useEffect(() => {
    function update() {
      setInsets(readInsets());
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return insets;
}
