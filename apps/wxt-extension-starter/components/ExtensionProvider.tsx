import { RocketProvider } from '@rocket/ui';

interface ExtensionProviderProps {
  children: React.ReactNode;
}

export function ExtensionProvider({ children }: ExtensionProviderProps) {
  return <RocketProvider>{children}</RocketProvider>;
}
