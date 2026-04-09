import { Timeline as ChakraTimeline } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import type { TimelineProps } from './Timeline.types';

const Timeline = ({
  ref,
  items,
  ...props
}: TimelineProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const timelineItems = useMemo(
    () =>
      items?.map(({ title, description, icon }, index) => (
        <ChakraTimeline.Item key={`${title}-${index}`}>
          <ChakraTimeline.Connector>
            <ChakraTimeline.Separator />
            <ChakraTimeline.Indicator>{icon}</ChakraTimeline.Indicator>
          </ChakraTimeline.Connector>
          <ChakraTimeline.Content>
            {title && <ChakraTimeline.Title>{title}</ChakraTimeline.Title>}
            {description && <ChakraTimeline.Description>{description}</ChakraTimeline.Description>}
          </ChakraTimeline.Content>
        </ChakraTimeline.Item>
      )) || null,
    [items]
  );

  return (
    <ChakraTimeline.Root ref={ref} {...TimelineStyles} {...props}>
      {timelineItems}
    </ChakraTimeline.Root>
  );
};

const TimelineStyles: StyleProps = {};

export { Timeline };
