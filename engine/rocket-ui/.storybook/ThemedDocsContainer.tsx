import { DocsContainer } from '@storybook/addon-docs/blocks';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import RocketDark from './RocketDark';
import RocketLight from './RocketLight';

export const ThemedDocsContainer: typeof DocsContainer = ({ children, ...props }) => {
  const isDark = useDarkMode();
  return (
    <DocsContainer {...props} theme={isDark ? RocketDark : RocketLight}>
      {children}
    </DocsContainer>
  );
};
