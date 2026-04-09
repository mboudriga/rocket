import type { TimelineRootProps } from '@chakra-ui/react';

export interface TimelineItemProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: 'complete' | 'current' | 'incomplete';
}

export interface TimelineProps extends TimelineRootProps {
  items?: Array<TimelineItemProps>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'subtle' | 'plain';
}

export const TimelineDefaultProps: TimelineProps = {
  size: 'md',
  variant: 'solid',
};
