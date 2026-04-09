import { AbsoluteCenter, ProgressCircle as ChakraProgressCircle } from '@chakra-ui/react';

import type { ProgressCircleProps } from './ProgressCircle.types';

const ProgressCircle = ({
  ref,
  ...props
}: ProgressCircleProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraProgressCircle.Root ref={ref} {...props}>
      <ChakraProgressCircle.Circle css={{ zIndex: 0 }}>
        <ChakraProgressCircle.Track />
        <ChakraProgressCircle.Range />
      </ChakraProgressCircle.Circle>
      {props.value != null && (
        <AbsoluteCenter bg="bg" borderRadius="full" width="60%" height="60%" display="flex" alignItems="center" justifyContent="center" zIndex={1}>
          <ChakraProgressCircle.ValueText color="fg" />
        </AbsoluteCenter>
      )}
    </ChakraProgressCircle.Root>
  );
};

export { ProgressCircle };
