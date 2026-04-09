import type { FC } from 'react';
import { Box, type BoxProps } from '../../../src';

interface WidgetTemplateProps {
  url: string;
}

export const WidgetTemplate: FC<WidgetTemplateProps> = ({ url }) => {
  return (
    <Box {...BoxStyles}>
      <iframe src={url} title="Widget content"></iframe>
    </Box>
  );
};

const BoxStyles: BoxProps = {
  css: { '& iframe': { height: '100vh', width: '100vw' } },
};
