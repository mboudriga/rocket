import { Clipboard as ChakraClipboard } from '@chakra-ui/react';
import { Button } from '@components/Form/Button';
import { LuCheck, LuClipboard } from 'react-icons/lu';
import type { ClipboardProps } from './Clipboard.types';

const Clipboard = ({
  ref,
  value,
  children,
  ...props
}: ClipboardProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraClipboard.Root ref={ref} value={value} {...props}>
      <ChakraClipboard.Trigger asChild>
        {children || (
          <Button variant="outline" size="sm" background="bg">
            <ChakraClipboard.Indicator copied={<LuCheck />}>
              <LuClipboard />
            </ChakraClipboard.Indicator>
            <ChakraClipboard.CopyText />
          </Button>
        )}
      </ChakraClipboard.Trigger>
    </ChakraClipboard.Root>
  );
};

export { Clipboard };
