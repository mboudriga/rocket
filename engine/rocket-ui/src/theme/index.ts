import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { BREAKPOINT_VALUES } from '../constants';

/**
 * Override Dialog recipe's z-index from dynamic CSS variables (var(--z-index))
 * to static Chakra tokens. The default recipe relies on Zag.js's async syncZIndex
 * mechanism which can fail, leaving the backdrop above the content.
 * The Drawer recipe uses static tokens and works correctly — we match that pattern.
 */
const dialogRecipeFix = defineConfig({
  theme: {
    slotRecipes: {
      dialog: {
        slots: [],
        base: {
          backdrop: {
            zIndex: 'overlay',
          },
          positioner: {
            zIndex: 'modal',
          },
          content: {
            zIndex: 'modal',
          },
        },
      },
    },
  },
});

/**
 * Override Drawer recipe's border-radius per placement.
 * The edge flush against the viewport should have 0 radius;
 * the interior corners keep the default radius.
 */
const drawerRecipeFix = defineConfig({
  theme: {
    slotRecipes: {
      drawer: {
        slots: [],
        variants: {
          placement: {
            start: { content: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } },
            end: { content: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } },
            top: { content: { borderTopLeftRadius: 0, borderTopRightRadius: 0 } },
            bottom: { content: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } },
          },
        },
      },
    },
  },
});

/**
 * Override Field recipe for WCAG AA compliance:
 * - errorText: use fg.error token instead of red.500 (#ef4444) which fails 4.5:1 contrast
 * - label disabled: use explicit color instead of opacity which produces #848485 (3.73:1)
 */
const fieldRecipeFix = defineConfig({
  theme: {
    slotRecipes: {
      field: {
        slots: [],
        base: {
          root: {
            _disabled: {
              opacity: 1,
            },
          },
          errorText: {
            color: 'fg.error',
          },
          label: {
            _disabled: {
              color: 'fg.muted',
            },
          },
          helperText: {
            _disabled: {
              color: 'fg.subtle',
            },
          },
        },
      },
    },
  },
});

/**
 * Override TagsInput disabled state to use explicit colors instead of opacity.
 * Chakra's default `opacity: 0.5` on the control produces #848485 text on #fafafa,
 * which fails WCAG AA 4.5:1 contrast (3.57:1).
 */
const tagsInputRecipeFix = defineConfig({
  theme: {
    slotRecipes: {
      tagsInput: {
        slots: [],
        base: {
          control: {
            _disabled: {
              opacity: 1,
              cursor: 'not-allowed',
            },
          },
          itemText: {
            _disabled: {
              color: 'fg.muted',
            },
          },
        },
      },
    },
  },
});

export const ROCKET_THEME = createSystem(defaultConfig, dialogRecipeFix, drawerRecipeFix, fieldRecipeFix, tagsInputRecipeFix, {
  globalCss: {
    // Preserve semantic text styling
    'em, i': {
      fontStyle: 'italic',
    },
    'strong, b': {
      fontWeight: 'bold',
    },
  },
  theme: {
    breakpoints: BREAKPOINT_VALUES,
    semanticTokens: {
      colors: {
        // Override solid backgrounds to meet WCAG AA 4.5:1 contrast with white text
        green: {
          solid: { value: { _light: '#15803d', _dark: '#16a34a' } },
        },
        orange: {
          solid: { value: { _light: '#c2410c', _dark: '#ea580c' } },
        },
        fg: {
          error: { value: { _light: '{colors.red.600}', _dark: '{colors.red.400}' } },
        },
        cyan: {
          solid: { value: { _light: '#0e7490', _dark: '#06b6d4' } },
        },
        teal: {
          solid: { value: { _light: '#0f766e', _dark: '#0d9488' } },
        },
      },
    },
  },
});

export default ROCKET_THEME;
