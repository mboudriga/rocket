import { Progress as ChakraProgress } from '@chakra-ui/react';

import type { ProgressProps } from './Progress.types';

const Progress = ({
  ref,
  ...props
}: ProgressProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraProgress.Root ref={ref} width="100%" {...props}>
      <ChakraProgress.Track background="bg">
        <ChakraProgress.Range />
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  );
};

export { Progress };
