import type { FC } from 'react';
import { List, type ListProps, Text } from '../../../src';

export interface DocsListItem extends ListProps {
  title: string;
  description: string;
}

export interface DocsCodeProps extends ListProps {
  items: Array<DocsListItem>;
  icon?: any;
}

export const DocsList: FC<DocsCodeProps> = ({ items, icon, ...props }) => {
  return (
    <List icon={icon} marginLeft={icon ? 0 : 5} {...props}>
      {items.map(({ title, description }) => (
        <Text as="span" key={title}>
          <Text as="span" fontWeight="medium">
            {`${title}: `}
          </Text>
          {description}
        </Text>
      ))}
    </List>
  );
};
