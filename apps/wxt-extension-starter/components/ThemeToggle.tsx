import { Button, Text } from '@rocket/ui';
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu';

const THEME_ICONS = {
  light: <LuSun />,
  dark: <LuMoon />,
  system: <LuMonitor />,
} as const;

const THEME_ORDER = ['light', 'dark', 'system'] as const;

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    themeStorage.getValue().then(setTheme);
    const unwatch = themeStorage.watch((value: 'light' | 'dark' | 'system' | null) =>
      setTheme(value ?? 'system')
    );
    return () => unwatch();
  }, []);

  const cycleTheme = async () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length] ?? 'system';
    await themeStorage.setValue(next);
  };

  return (
    <Button size="sm" variant="outline" onClick={cycleTheme}>
      {THEME_ICONS[theme]}
      <Text ml={1}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</Text>
    </Button>
  );
}
