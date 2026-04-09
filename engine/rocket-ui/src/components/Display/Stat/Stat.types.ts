import type { StatRootProps } from '@chakra-ui/react';

export interface StatProps extends StatRootProps {
  label?: string;
  /** Label below the stat. */
  subLabel?: string;
}

export const StatDefaultProps: StatProps = {
  label: '',
  subLabel: '',
};
