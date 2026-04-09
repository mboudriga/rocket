import { QrCode } from '@chakra-ui/react';

import type { QRCodeProps } from './QRCode.types';

const QRCode = ({
  ref,
  value,
  ...props
}: QRCodeProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <QrCode.Root ref={ref} value={value} {...props}>
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  );
};

export { QRCode };
