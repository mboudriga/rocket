import { ToggleGroup as ArkToggleGroup } from '@ark-ui/react/toggle-group';
import { chakra, Flex, IconButton, Link, Separator } from '@chakra-ui/react';
import { createContext, type KeyboardEvent, useContext } from 'react';

import type {
  ToolbarButtonProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupProps,
  ToolbarToggleItemProps,
} from './Toolbar.types';

// Context for toolbar state
interface ToolbarContextValue {
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg';
  loop: boolean;
}

const ToolbarContext = createContext<ToolbarContextValue>({
  orientation: 'horizontal',
  size: 'md',
  loop: true,
});

const useToolbar = () => useContext(ToolbarContext);

// Size mappings
const sizeMap = {
  sm: { button: 'xs' as const, icon: '14px' },
  md: { button: 'sm' as const, icon: '16px' },
  lg: { button: 'md' as const, icon: '20px' },
};

// Toolbar Root
const ToolbarRoot = ({
  ref,
  orientation = 'horizontal',
  loop = true,
  size = 'md',
  children,
  ...props
}: ToolbarProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      event.currentTarget.querySelectorAll('[data-toolbar-item]')
    ) as Array<HTMLElement>;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    let nextIndex = currentIndex;
    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    if (event.key === nextKey) {
      event.preventDefault();
      nextIndex = currentIndex + 1;
      if (nextIndex >= items.length) {
        nextIndex = loop ? 0 : items.length - 1;
      }
    } else if (event.key === prevKey) {
      event.preventDefault();
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = loop ? items.length - 1 : 0;
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== currentIndex) {
      items[nextIndex]?.focus();
    }
  };

  const flexDirection = orientation === 'vertical' ? 'column' : 'row';

  return (
    <ToolbarContext.Provider value={{ orientation, size, loop }}>
      <Flex
        ref={ref}
        role="toolbar"
        aria-orientation={orientation}
        direction={flexDirection as 'row' | 'column'}
        gap={1}
        padding={1}
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        bg="bg.panel"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Flex>
    </ToolbarContext.Provider>
  );
};

// Toolbar Button
const ToolbarButton = ({
  ref,
  icon,
  label,
  disabled,
  size: propSize,
  onClick,
  ...props
}: ToolbarButtonProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { size: contextSize } = useToolbar();
  const size = propSize || contextSize;
  const buttonSize = sizeMap[size].button;

  return (
    <IconButton
      ref={ref}
      data-toolbar-item
      tabIndex={0}
      aria-label={label || 'Toolbar button'}
      variant="ghost"
      size={buttonSize}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

// Toolbar Toggle Group
const ToolbarToggleGroup = ({
  ref,
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  disabled,
  children,
}: ToolbarToggleGroupProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ArkToggleGroup.Root
      ref={ref}
      multiple={type === 'multiple'}
      value={Array.isArray(value) ? value : value ? [value] : undefined}
      defaultValue={
        Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : undefined
      }
      onValueChange={(details) => {
        if (type === 'single') {
          onValueChange?.(details.value[0] || '');
        } else {
          onValueChange?.(details.value);
        }
      }}
      disabled={disabled}
      style={{ display: 'flex', gap: '2px' }}
    >
      {children}
    </ArkToggleGroup.Root>
  );
};

// Toolbar Toggle Item
const ToolbarToggleItem = ({
  ref,
  value,
  icon,
  label,
  disabled,
  size: propSize,
  ...props
}: ToolbarToggleItemProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { size: contextSize } = useToolbar();
  const size = propSize || contextSize;
  const buttonSize = sizeMap[size].button;

  return (
    <ArkToggleGroup.Item value={value} asChild disabled={disabled}>
      <chakra.button
        ref={ref}
        data-toolbar-item
        tabIndex={0}
        aria-label={label || value}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        padding={buttonSize === 'xs' ? '1' : buttonSize === 'sm' ? '1.5' : '2'}
        borderRadius="md"
        bg="transparent"
        border="none"
        cursor="pointer"
        color="fg.muted"
        _hover={{ bg: 'bg.subtle', color: 'fg' }}
        _pressed={{ bg: 'bg.emphasized', color: 'fg' }}
        _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
        {...props}
      >
        {icon}
      </chakra.button>
    </ArkToggleGroup.Item>
  );
};

// Toolbar Separator
const ToolbarSeparator = ({
  ref,
  orientation: propOrientation,
  ...props
}: ToolbarSeparatorProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { orientation: contextOrientation } = useToolbar();
  const orientation =
    propOrientation || (contextOrientation === 'horizontal' ? 'vertical' : 'horizontal');

  return (
    <Separator
      ref={ref}
      orientation={orientation}
      height={orientation === 'vertical' ? '24px' : undefined}
      marginX={orientation === 'vertical' ? 1 : undefined}
      marginY={orientation === 'horizontal' ? 1 : undefined}
      {...props}
    />
  );
};

// Toolbar Link
const ToolbarLink = ({
  ref,
  icon,
  label,
  href,
  size: propSize,
  ...props
}: ToolbarLinkProps & {
  ref?: React.Ref<HTMLAnchorElement>;
}) => {
  const { size: contextSize } = useToolbar();
  const size = propSize || contextSize;
  const buttonSize = sizeMap[size].button;

  return (
    <Link
      ref={ref}
      href={href}
      data-toolbar-item
      tabIndex={0}
      aria-label={label}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      padding={buttonSize === 'xs' ? 1 : buttonSize === 'sm' ? 1.5 : 2}
      borderRadius="md"
      color="fg.muted"
      textDecoration="none"
      _hover={{
        bg: 'bg.subtle',
        color: 'fg',
        textDecoration: 'none',
      }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
        outlineOffset: '2px',
      }}
      {...props}
    >
      {icon}
    </Link>
  );
};

// Compound component
const Toolbar = Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
  Separator: ToolbarSeparator,
  Link: ToolbarLink,
});

export { Toolbar };
