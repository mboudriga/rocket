import { Accordion as ChakraAccordion } from '@chakra-ui/react';
import { Text } from '@components/Typography/Text';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import { AccordionDefaultProps, type AccordionProps } from './Accordion.types';

const Accordion = ({
  ref,
  items,
  variant = AccordionDefaultProps.variant,
  ...props
}: AccordionProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const isOutline = variant === 'outline';
  const backgroundStyle = isOutline ? undefined : { bg: { base: 'white', _dark: 'gray.800' } };

  const accordionItems = useMemo(
    () =>
      items?.map(({ value, title, content }) => (
        <ChakraAccordion.Item key={title} value={value}>
          <ChakraAccordion.ItemTrigger {...AccordionTriggerStyles} {...backgroundStyle}>
            <Text {...TitleStyles}>{title}</Text>
            <ChakraAccordion.ItemIndicator />
          </ChakraAccordion.ItemTrigger>
          <ChakraAccordion.ItemContent {...backgroundStyle}>
            <ChakraAccordion.ItemBody>{content}</ChakraAccordion.ItemBody>
          </ChakraAccordion.ItemContent>
        </ChakraAccordion.Item>
      )) || null,
    [items, backgroundStyle]
  );

  return (
    <ChakraAccordion.Root ref={ref} variant={variant} {...AccordionStyles} {...props}>
      {accordionItems}
    </ChakraAccordion.Root>
  );
};

const AccordionStyles: StyleProps = {
  width: '100%',
};

const AccordionTriggerStyles: StyleProps = {
  _hover: {
    cursor: 'pointer',
  },
};

const TitleStyles: StyleProps = {
  flex: '1',
  textAlign: 'left',
};

export { Accordion };
