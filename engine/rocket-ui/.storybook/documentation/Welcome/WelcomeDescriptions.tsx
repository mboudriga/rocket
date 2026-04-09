import { PiBookmarkSimpleFill, PiFolderSimpleFill } from 'react-icons/pi';
import { COMPONENT_CATEGORIES, Flex } from '../../../src';
import { Docs } from '../../templates';
import { getCategoryMeta } from '../../templates/StoryTemplate/StoryTemplateCategory';

export const WelcomeDescriptions = ({ ...props }) => {
  return (
    <Flex.V gap={8} {...props}>
      <Docs.Card title="Documentation">
        <Docs.List
          icon={<PiFolderSimpleFill />}
          iconColor={{ base: '#d03042', _dark: '#ed4757' }}
          items={[
            {
              title: 'Contribution',
              description: 'Guides for adding new components, stories, and tests',
            },
            {
              title: 'Usage',
              description:
                'Patterns for styling, layout, breakpoints, colors, and toasts',
            },
          ]}
        />
      </Docs.Card>

      <Docs.Card title="Components">
        <Docs.List
          icon={<PiFolderSimpleFill />}
          iconColor={{ base: '#d03042', _dark: '#ed4757' }}
          items={COMPONENT_CATEGORIES.map((key) => ({
            title: key,
            description: getCategoryMeta(key).description,
          }))}
        />
      </Docs.Card>

      <Docs.Card title="Widgets">
        <Docs.List
          icon={<PiBookmarkSimpleFill />}
          iconColor={{ base: '#D3AF37', _dark: '#E6C842' }}
          items={[
            { title: 'AG Grid', description: 'AG Grid documentation site' },
            { title: 'Chakra UI', description: 'Chakra UI documentation site' },
            { title: 'Code Snippet', description: 'Code sharing tool' },
            { title: 'Icons', description: 'React Icons documentation site' },
            { title: 'Illustrations', description: 'Open source svg lookup' },
            { title: 'PNPM', description: 'PNPM documentation site' },
            { title: 'Readme', description: 'Readme building tool' },
            { title: 'Regex', description: 'Regex visualization tool' },
            { title: 'Vite', description: 'Vite documentation site' },
          ]}
        />
      </Docs.Card>
    </Flex.V>
  );
};
