import type { StyleProps } from '../../../../types';

// ============================================================================
// Size Mappings
// ============================================================================

export const sizeMap = {
  sm: {
    button: 'xs' as const,
    fontSize: 'sm',
    padding: 2,
    minHeight: '80px',
    iconSize: '14px',
  },
  md: {
    button: 'sm' as const,
    fontSize: 'md',
    padding: 3,
    minHeight: '120px',
    iconSize: '16px',
  },
  lg: {
    button: 'md' as const,
    fontSize: 'lg',
    padding: 4,
    minHeight: '160px',
    iconSize: '20px',
  },
};

// ============================================================================
// Container Styles
// ============================================================================

export const containerStyles: StyleProps = {
  borderWidth: '1px',
  borderColor: 'border',
  borderRadius: 'md',
  bg: 'bg',
  overflow: 'hidden',
  _focusWithin: {
    borderColor: 'colorPalette.500',
    boxShadow: '0 0 0 1px var(--chakra-colors-color-palette-500)',
  },
};

export const containerDisabledStyles: StyleProps = {
  opacity: 0.6,
  cursor: 'not-allowed',
  _focusWithin: {
    borderColor: 'border',
    boxShadow: 'none',
  },
};

export const containerInvalidStyles: StyleProps = {
  borderColor: 'red.500',
  _focusWithin: {
    borderColor: 'red.500',
    boxShadow: '0 0 0 1px var(--chakra-colors-red-500)',
  },
};

// ============================================================================
// Toolbar Styles
// ============================================================================

export const toolbarStyles: StyleProps = {
  borderBottomWidth: '1px',
  borderColor: 'border',
  bg: 'bg.muted',
  padding: 1,
  gap: 1,
  flexWrap: 'wrap',
};

// ============================================================================
// Control Group Styles
// ============================================================================

export const controlGroupStyles: StyleProps = {
  gap: '2px',
};

// ============================================================================
// Content Styles
// ============================================================================

export const contentStyles: StyleProps = {
  overflowY: 'auto',
};

// ============================================================================
// Footer Styles
// ============================================================================

export const footerStyles: StyleProps = {
  borderTopWidth: '1px',
  borderColor: 'border',
  bg: 'bg.muted',
  paddingX: 3,
  paddingY: 1,
  fontSize: 'xs',
  color: 'fg.muted',
};

export const footerOverLimitStyles: StyleProps = {
  color: 'red.500',
};
