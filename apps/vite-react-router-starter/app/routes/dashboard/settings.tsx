import { Flex, Heading, Text } from '@rocket/ui';
import { LuSettings } from 'react-icons/lu';

export default function Settings() {
  return (
    <Flex.V gap="6">
      <Flex.H align="center" gap="3">
        <LuSettings />
        <Heading size="lg">Settings</Heading>
      </Flex.H>
      <Text color="fg.muted">Application settings will appear here.</Text>
    </Flex.V>
  );
}
