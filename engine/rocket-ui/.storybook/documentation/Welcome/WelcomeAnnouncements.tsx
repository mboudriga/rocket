import { Alert, Flex } from '../../../src';

import { Docs } from '../../templates';
import { ANNOUNCEMENTS } from './WelcomeAnnouncements.utils';

export const WelcomeAnnouncements = ({ ...props }) => {
  return (
    <Docs.Card title="Announcements" {...props}>
      <Flex.V gap={5}>
        {ANNOUNCEMENTS.map(({ status, message }) => (
          <Alert key={message} variant="subtle" status={status}>
            {message}
          </Alert>
        ))}
      </Flex.V>
    </Docs.Card>
  );
};
