import { Flex } from '@components/Layout/Flex';
import { Icon } from '@components/Media/Icon';
import { Text } from '@components/Typography/Text';
import type { FC, ReactNode } from 'react';
import { LuInfo } from 'react-icons/lu';

interface NoteBoxProps {
  children: ReactNode;
}

export const NoteBox: FC<NoteBoxProps> = ({ children }) => (
  <Flex.H
    gap="3"
    padding="4"
    bg="blue.subtle"
    borderRadius="lg"
    borderColor="blue.muted"
    borderWidth="1px"
    align="start"
  >
    <Icon as={LuInfo} color="blue.fg" flexShrink={0} marginTop="0.5" />
    <Text fontSize="sm" color="blue.fg">
      {children}
    </Text>
  </Flex.H>
);
