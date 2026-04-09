import { useCallback, useMemo } from 'react';
import { LuSearch } from 'react-icons/lu';

import { Badge, Flex, type FlexProps, Icon, type StyleProps, Text } from '../../../src';

export const WelcomeSearch = () => {
  const isMac = useMemo(() => {
    const ua = navigator.userAgentData;
    if (ua) {
      return ua.platform === 'macOS';
    }
    return /Mac|iPhone|iPad/.test(navigator.platform);
  }, []);

  const handleClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent('rocket:open-search'));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <Flex.H
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Search components (${isMac ? 'Command+K' : 'Ctrl+K'})`}
      {...BarStyles}
    >
      <Icon as={LuSearch} boxSize="5" color="fg.muted" flexShrink={0} />

      <Text color="fg.muted" flex="1">
        Search components...
      </Text>

      <Badge variant="outline" size="sm" {...BadgeStyles}>
        {isMac ? '\u2318K' : 'Ctrl+K'}
      </Badge>
    </Flex.H>
  );
};

const BarStyles: FlexProps = {
  alignItems: 'center',
  gap: 3,
  paddingX: 4,
  paddingY: 3,
  marginBottom: 8,
  bg: { base: '#faf9f8', _dark: '#1e1d1c' },
  borderWidth: '1px',
  borderColor: { base: 'rgba(28,27,26,0.12)', _dark: 'rgba(255,255,255,0.1)' },
  borderRadius: 'xl',
  cursor: 'pointer',
  transition: '0.15s ease',
  _hover: {
    borderColor: { base: 'rgba(28,27,26,0.2)', _dark: 'rgba(255,255,255,0.16)' },
  },
};

const BadgeStyles: StyleProps = {
  flexShrink: 0,
  fontFamily: 'mono',
  letterSpacing: 'wider',
};
