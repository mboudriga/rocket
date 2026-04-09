import { Splitter as ChakraSplitter, useSplitterContext } from '@chakra-ui/react';
import { Fragment, memo, useMemo } from 'react';
import type { StyleProps } from '../../../types';

import { SplitterDefaultProps, type SplitterProps } from './Splitter.types';

// Custom ResizeTrigger wrapper that adds aria-valuenow for accessibility
interface ResizeTriggerWithAriaValueProps {
  id: `${string}:${string}`;
  firstPanelId: string;
}

const ResizeTriggerWithAriaValue = ({ id, firstPanelId }: ResizeTriggerWithAriaValueProps) => {
  const splitterApi = useSplitterContext();

  // Get current size of the first panel to use as aria-valuenow
  const panels = splitterApi.getPanels();
  const panelIndex = panels.findIndex((p) => p.id === firstPanelId);
  const sizes = splitterApi.getSizes();
  const ariaValueNow = sizes[panelIndex] ?? 0;

  return <ChakraSplitter.ResizeTrigger id={id} aria-valuenow={Math.round(ariaValueNow)} />;
};

// Inner component that renders panels and resize triggers with context access
interface SplitterContentProps {
  panels: NonNullable<SplitterProps['panels']>;
}

const SplitterContent = ({ panels }: SplitterContentProps) => {
  return (
    <>
      {panels.map(({ id, children }, index) => (
        <Fragment key={id}>
          <ChakraSplitter.Panel id={id}>{children}</ChakraSplitter.Panel>
          {index < panels.length - 1 && (
            <ResizeTriggerWithAriaValue
              id={`${panels[index]?.id}:${panels[index + 1]?.id}`}
              firstPanelId={panels[index]?.id ?? ''}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

const Splitter = memo(
  ({
    ref,
    panels,
    orientation = SplitterDefaultProps.orientation,
    ...props
  }: SplitterProps & {
    ref?: React.Ref<HTMLDivElement>;
  }) => {
    // Transform panels into Chakra's expected format for the Root panels prop
    const chakraPanels = useMemo(
      () =>
        panels?.map(({ id, minSize, maxSize, defaultSize }) => ({
          id,
          minSize,
          maxSize,
          size: defaultSize,
        })) || [],
      [panels]
    );

    if (!panels || panels.length === 0) {
      return null;
    }

    return (
      <ChakraSplitter.Root
        ref={ref}
        panels={chakraPanels}
        orientation={orientation}
        {...SplitterStyles}
        {...props}
      >
        <SplitterContent panels={panels} />
      </ChakraSplitter.Root>
    );
  }
);

const SplitterStyles: StyleProps = {
  height: '100%',
  width: '100%',
};

export { Splitter };
