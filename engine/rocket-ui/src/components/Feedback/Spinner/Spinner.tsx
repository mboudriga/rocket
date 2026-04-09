import { Spinner as ChakraSpinner } from '@chakra-ui/react';

import type { SpinnerProps } from './Spinner.types';

const Spinner = ({
  ref,
  ...props
}: SpinnerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraSpinner
      ref={ref}
      role="status"
      aria-label="Loading"
      color="blue.600"
      css={{ '--spinner-track-color': 'colors.gray.300' }}
      {...props}
    />
  );
};

export { Spinner };
