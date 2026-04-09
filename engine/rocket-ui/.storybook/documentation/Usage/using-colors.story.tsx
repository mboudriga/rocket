import { Docs } from '../../templates';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Using_Colors = () => (
  <Docs.Template title="Using Colors">
    <Docs.Code title="Semantic Tokens" code={SEMANTIC_TOKENS_CODE} language="javascript">
      Always use semantic tokens in apps. They automatically switch between light and dark mode values.
      Never use raw color values like gray.500 or blue.600 in application code.
    </Docs.Code>

    <Docs.Card title="Available Tokens">
      <Docs.List
        items={[
          { title: 'fg', description: 'Primary text — body copy, headings' },
          { title: 'fg.muted', description: 'Secondary text — descriptions, hints, labels' },
          { title: 'fg.subtle', description: 'Tertiary text — placeholders, disabled states' },
          {
            title: 'fg.inverted',
            description: 'Inverted text — text on dark backgrounds in light mode',
          },
          { title: 'bg', description: 'Primary background — main page background' },
          { title: 'bg.muted', description: 'Secondary background — sections, sidebars' },
          { title: 'bg.subtle', description: 'Subtle background — hover states' },
          { title: 'bg.surface', description: 'Surface background — cards, elevated content' },
          { title: 'bg.panel', description: 'Panel background — overlays, drawers' },
          { title: 'border', description: 'Default border color — dividers, input borders' },
        ]}
      />
    </Docs.Card>

    <Docs.Code title="Color Palette" code={COLOR_PALETTE_CODE} language="javascript">
      Use colorPalette to apply consistent color theming. Set it on a parent element and reference
      colorPalette.fg, colorPalette.solid, colorPalette.contrast, colorPalette.subtle, and
      colorPalette.muted on children.
    </Docs.Code>

    <Docs.Card title="Available Palettes">
      <Docs.List
        items={[
          { title: 'gray', description: 'Neutral tones for backgrounds and secondary content' },
          { title: 'red', description: 'Error states, destructive actions, and alerts' },
          { title: 'orange', description: 'Warnings and attention-grabbing elements' },
          { title: 'yellow', description: 'Cautions and highlighted information' },
          {
            title: 'green',
            description: 'Success states, confirmations, and positive indicators',
          },
          { title: 'teal', description: 'Alternative accent for informational content' },
          { title: 'blue', description: 'Primary actions, links, and interactive elements' },
          { title: 'cyan', description: 'Supplementary accent for data visualization' },
          {
            title: 'purple',
            description: 'Premium features, special content, or branding',
          },
          { title: 'pink', description: 'Decorative accents and playful elements' },
        ]}
      />
    </Docs.Card>

    <Docs.Code title="Dark Mode" code={DARK_MODE_CODE} language="javascript">
      Semantic tokens automatically switch values between light and dark themes. For custom cases
      where a token doesn't exist, use the _light and _dark condition objects. Always prefer semantic
      tokens over manual conditionals.
    </Docs.Code>
  </Docs.Template>
);

export default {
  title: 'Documentation/Usage/Using Colors',
  component: Using_Colors,
};

const SEMANTIC_TOKENS_CODE = `import { Box, Text } from '@rocket/ui';

// ✅ Correct — semantic tokens auto-switch for dark mode
<Text color="fg">Primary text</Text>
<Text color="fg.muted">Secondary text</Text>
<Text color="fg.subtle">Placeholder text</Text>
<Box bg="bg">Primary background</Box>
<Box bg="bg.muted">Section background</Box>
<Box bg="bg.surface">Card background</Box>

// ❌ Wrong — raw colors don't adapt to dark mode
<Text color="gray.900">Hardcoded text</Text>
<Box bg="gray.50">Hardcoded background</Box>`;

const COLOR_PALETTE_CODE = `import { Box, Text, Button } from '@rocket/ui';

// Set colorPalette on a parent to theme all children
<Box colorPalette="blue">
  <Text color="colorPalette.fg">Blue accent text</Text>
  <Button colorPalette="blue" variant="solid">
    Solid blue button
  </Button>
  <Box bg="colorPalette.subtle">
    Subtle blue background
  </Box>
  <Box bg="colorPalette.solid">
    <Text color="colorPalette.contrast">White text on blue</Text>
  </Box>
</Box>`;

const DARK_MODE_CODE = `import { Box, Text } from '@rocket/ui';

// Semantic tokens handle dark mode automatically
<Box bg="bg.surface">
  <Text color="fg">This adapts to light/dark automatically</Text>
</Box>

// For custom one-off values, use _light/_dark conditions
<Box bg={{ _light: 'white', _dark: 'gray.900' }}>
  <Text color={{ _light: 'gray.800', _dark: 'gray.100' }}>
    Custom light/dark values
  </Text>
</Box>

// Prefer semantic tokens over _light/_dark when possible`;
