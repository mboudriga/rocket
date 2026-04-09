import { Flex, type StyleProps } from '../../../src';

import { Docs } from '../../templates';
import { WelcomeAnnouncements } from './WelcomeAnnouncements';
import { WelcomeDescriptions } from './WelcomeDescriptions';
import { WelcomeLinks } from './WelcomeLinks';
import { WelcomeSearch } from './WelcomeSearch';

// Match the exported name to the name in the title (removes the sidebar sub-folder)
export const Welcome = () => {
  return (
    <Docs.Template title="Welcome" gap={8}>
      <WelcomeSearch />

      <Flex {...FlexStyles}>
        <WelcomeDescriptions flex="1" order={{ base: 1, desktop: 0 }} />

        <WelcomeAnnouncements flex="1" order={{ base: 0, desktop: 1 }} />
      </Flex>

      <WelcomeLinks />
    </Docs.Template>
  );
};

const FlexStyles: StyleProps = {
  flexDirection: { base: 'column', desktop: 'row' },
  gap: 8,
};

export default {
  title: 'Documentation/Welcome',
  component: Welcome,
};
