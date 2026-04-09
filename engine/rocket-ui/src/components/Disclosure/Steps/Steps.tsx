import { Steps as ChakraSteps } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import { StepsDefaultProps, type StepsProps } from './Steps.types';

const Steps = ({
  ref,
  items,
  onChange,
  orientation = StepsDefaultProps.orientation,
  ...props
}: StepsProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const stepItems = useMemo(
    () =>
      items?.map(({ title, description, icon }, index) => (
        <ChakraSteps.Item key={`${title}-${index}`} index={index}>
          <ChakraSteps.Trigger {...TriggerA11yOverrides}>
            <ChakraSteps.Indicator {...IndicatorStyles}>{icon}</ChakraSteps.Indicator>
            <ChakraSteps.Title whiteSpace="nowrap">{title}</ChakraSteps.Title>
            {description && <ChakraSteps.Description whiteSpace="nowrap">{description}</ChakraSteps.Description>}
          </ChakraSteps.Trigger>
          <ChakraSteps.Separator />
        </ChakraSteps.Item>
      )) || null,
    [items]
  );

  return (
    <ChakraSteps.Root
      ref={ref}
      count={items?.length || 0}
      orientation={orientation}
      onStepChange={(details) => onChange?.(details.step)}
      {...StepsStyles}
      {...props}
    >
      <ChakraSteps.List {...ListA11yOverrides} gap={orientation === 'vertical' ? '4' : undefined}>
        {stepItems}
      </ChakraSteps.List>
      {items?.map(({ title }, index) => (
        <ChakraSteps.Content key={`content-${title}-${index}`} index={index} />
      ))}
      <ChakraSteps.CompletedContent>All steps completed!</ChakraSteps.CompletedContent>
    </ChakraSteps.Root>
  );
};

const StepsStyles: StyleProps = {
  width: '100%',
};

const IndicatorStyles: StyleProps = {
  _incomplete: {
    background: 'bg',
  },
};

// Zag.js applies tablist/tab ARIA roles to Steps, but the intermediate Item wrappers
// break the required parent-child relationship, causing aria-required-children and
// aria-required-parent violations. Override with group/button semantics instead.
// Uses `null` because Zag's mergeProps skips `undefined` values (`!== void 0` check).
const ListA11yOverrides = {
  role: 'group',
  'aria-label': 'Progress steps',
  'aria-orientation': null,
  'aria-owns': null,
} as Record<string, unknown>;

const TriggerA11yOverrides = {
  role: null,
  'aria-selected': null,
} as Record<string, unknown>;

export { Steps };
