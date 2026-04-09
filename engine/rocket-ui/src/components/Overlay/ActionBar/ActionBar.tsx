import { ActionBar as ChakraActionBar, Portal } from '@chakra-ui/react';
import { Button } from '@components/Form/Button';
import { useMemo } from 'react';
import { ActionBarDefaultProps, type ActionBarProps } from './ActionBar.types';

const ActionBar = ({
  ref,
  open = ActionBarDefaultProps.open,
  actions,
  selectionText,
  hasCloseTrigger = ActionBarDefaultProps.hasCloseTrigger,
  onClose,
  ...props
}: ActionBarProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const actionButtons = useMemo(
    () =>
      actions?.map(({ label, ...buttonProps }, index) => (
        <Button key={`${label}-${index}`} {...buttonProps}>
          {label}
        </Button>
      )) || null,
    [actions]
  );

  return (
    <ChakraActionBar.Root open={open} lazyMount {...props}>
      <Portal>
        <ChakraActionBar.Positioner>
          <ChakraActionBar.Content ref={ref}>
            {selectionText && (
              <>
                <ChakraActionBar.SelectionTrigger>{selectionText}</ChakraActionBar.SelectionTrigger>
                <ChakraActionBar.Separator />
              </>
            )}
            {actionButtons}
            {hasCloseTrigger && <ChakraActionBar.CloseTrigger onClick={onClose} />}
          </ChakraActionBar.Content>
        </ChakraActionBar.Positioner>
      </Portal>
    </ChakraActionBar.Root>
  );
};

export { ActionBar };
