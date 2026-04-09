import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { LuBell, LuFolder, LuHouse, LuSettings, LuStar, LuUser } from 'react-icons/lu';
import { Tabs } from './Tabs';

export const TabsExamples: FC = () => {
  const [controlled, setControlled] = useState('tab1');

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Tabs
          defaultValue="tab1"
          tabs={[
            { value: 'tab1', title: 'Tab 1' },
            { value: 'tab2', title: 'Tab 2' },
            { value: 'tab3', title: 'Tab 3' },
          ]}
        >
          <Box padding="4">Content for Tab 1</Box>
          <Box padding="4">Content for Tab 2</Box>
          <Box padding="4">Content for Tab 3</Box>
        </Tabs>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="4">
          {(['line', 'subtle', 'enclosed', 'outline', 'plain'] as const).map((variant) => (
            <Box key={variant}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {variant}
              </Text>
              <Tabs
                variant={variant}
                defaultValue="tab1"
                tabs={[
                  { value: 'tab1', title: 'Tab 1' },
                  { value: 'tab2', title: 'Tab 2' },
                  { value: 'tab3', title: 'Tab 3' },
                ]}
              >
                <Box padding="4">Content 1</Box>
                <Box padding="4">Content 2</Box>
                <Box padding="4">Content 3</Box>
              </Tabs>
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {size}
              </Text>
              <Tabs
                size={size}
                defaultValue="tab1"
                tabs={[
                  { value: 'tab1', title: 'Tab 1' },
                  { value: 'tab2', title: 'Tab 2' },
                ]}
              >
                <Box padding="4">Content for {size} tabs</Box>
                <Box padding="4">More content</Box>
              </Tabs>
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <Tabs
          defaultValue="profile"
          tabs={[
            { value: 'profile', title: 'Profile', icon: <LuUser size={16} /> },
            { value: 'settings', title: 'Settings', icon: <LuSettings size={16} /> },
            { value: 'notifications', title: 'Notifications', icon: <LuBell size={16} /> },
          ]}
        >
          <Box padding="4">Profile settings and information</Box>
          <Box padding="4">Application settings</Box>
          <Box padding="4">Notification preferences</Box>
        </Tabs>
      </ExampleSection>

      {/* Justify */}
      <ExampleSection title="Tab Alignment (justify)">
        <Flex.V gap="4">
          {(['start', 'center', 'end'] as const).map((justify) => (
            <Box key={justify}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                justify="{justify}"
              </Text>
              <Tabs
                justify={justify}
                defaultValue="tab1"
                tabs={[
                  { value: 'tab1', title: 'Tab 1' },
                  { value: 'tab2', title: 'Tab 2' },
                ]}
              >
                <Box padding="4">Content</Box>
                <Box padding="4">Content</Box>
              </Tabs>
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Vertical orientation */}
      <ExampleSection title="Vertical Orientation">
        <Tabs
          orientation="vertical"
          defaultValue="home"
          tabs={[
            { value: 'home', title: 'Home', icon: <LuHouse size={16} /> },
            { value: 'files', title: 'Files', icon: <LuFolder size={16} /> },
            { value: 'favorites', title: 'Favorites', icon: <LuStar size={16} /> },
          ]}
        >
          <Box padding="4" height="150px">
            Home content area
          </Box>
          <Box padding="4" height="150px">
            Files content area
          </Box>
          <Box padding="4" height="150px">
            Favorites content area
          </Box>
        </Tabs>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Text fontSize="xs" color="fg.muted" marginBottom="2">
          Selected tab: {controlled}
        </Text>
        <Tabs
          value={controlled}
          onChange={(value) => setControlled(value)}
          tabs={[
            { value: 'tab1', title: 'First' },
            { value: 'tab2', title: 'Second' },
            { value: 'tab3', title: 'Third' },
          ]}
        >
          <Box padding="4">First tab content</Box>
          <Box padding="4">Second tab content</Box>
          <Box padding="4">Third tab content</Box>
        </Tabs>
      </ExampleSection>
    </Flex.V>
  );
};
