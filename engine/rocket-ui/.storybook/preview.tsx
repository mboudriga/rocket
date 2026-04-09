import type { Preview } from '@storybook/react-vite';
import { fn, spyOn } from 'storybook/test';

import { RocketProvider } from '../src';
import { MdxCodeBlock } from './MdxCodeBlock';
import RocketDark from './RocketDark';
import RocketLight from './RocketLight';
import { GlobalSearch } from './search/GlobalSearch';
import { ThemedDocsContainer } from './ThemedDocsContainer';

/** @type { import('@storybook/react-vite').Preview } */
const preview: Preview = {
  async beforeEach() {
    spyOn(console, 'log').mockName('console.log');
    spyOn(console, 'warn').mockName('console.warn');
    spyOn(console, 'error').mockName('console.error');
  },

  args: {},

  /** Globally hide internal/framework props from the 'Props' panel */
  argTypes: {
    ref: { table: { disable: true } },
    recipe: { table: { disable: true } },
  },

  decorators: [
    (story) => (
      <RocketProvider>
        {story()}
        <GlobalSearch />
      </RocketProvider>
    ),
  ],

  parameters: {
    layout: 'fullscreen',

    /** Dark mode toggle config */
    darkMode: {
      dark: RocketDark,
      light: RocketLight,
      current: 'light',
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },

    /** Themed docs container for light/dark switching */
    docs: {
      container: ThemedDocsContainer,
      components: {
        code: MdxCodeBlock,
      },
    },

    /** Accessibility testing */
    a11y: {
      test: 'todo',
      config: {
        rules: [{ id: 'region', enabled: false }],
      },
    },

    /** Disable backgrounds — dark mode addon manages this */
    backgrounds: { disable: true },

    /** Tell Storybook how to order stories */
    options: {
      storySort: {
        method: 'alphabetical',
        locales: 'en-US',
        order: [
          'Documentation',
          [
            'Welcome',
            'Contribution',
            ['Add New Component', 'Add New Story', 'Writing Tests'],
            'Usage',
            ['How To Style', 'Using Flex', 'Using Breakpoints', 'Using Colors', 'Using Toast'],
          ],
          'Components',
          'Widgets',
        ],
      },
    },

    /** Global settings for the 'Props' panel */
    controls: {
      sort: 'requiredFirst',
      exclude: /_/g,
      expanded: true,
      disableSaveFromUI: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /** Values for the viewport selector in the story toolbar */
    viewport: {
      options: [
        {
          name: 'Small mobile',
          styles: { width: '320px', height: '568px' },
        },
        {
          name: 'Large mobile',
          styles: { width: '414px', height: '896px' },
        },
        {
          name: 'Small tablet',
          styles: { width: '600px', height: '962px' },
        },
        {
          name: 'Large tablet',
          styles: { width: '810px', height: '1080px' },
        },
        {
          name: 'Small desktop',
          styles: { width: '1024px', height: '768px' },
        },
        {
          name: 'Medium desktop',
          styles: { width: '1536px', height: '864px' },
        },
        {
          name: 'Large desktop',
          styles: { width: '1920px', height: '1080px' },
        },
      ],
    },
  },
};

export default preview;
