import { Stat as ChakraStat } from '@chakra-ui/react';

import { StatDefaultProps, type StatProps } from './Stat.types';

// TODO: Add increase/decrease variants
const Stat = ({
  ref,
  children,
  label = StatDefaultProps.label,
  subLabel = StatDefaultProps.subLabel,
  ...props
}: StatProps & {
  ref?: React.Ref<HTMLDListElement>;
}) => {
  return (
    <ChakraStat.Root ref={ref} flex="none" width="fit-content" {...props}>
      {label && <ChakraStat.Label>{label}</ChakraStat.Label>}
      <ChakraStat.ValueText>{children}</ChakraStat.ValueText>
      {subLabel && (
        <dd>
          <ChakraStat.HelpText>{subLabel}</ChakraStat.HelpText>
        </dd>
      )}
    </ChakraStat.Root>
  );
};

export { Stat };
