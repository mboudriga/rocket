import type { FC } from 'react';
import { Card, type CardProps } from '../../../src';

export interface DocsCardProps extends CardProps {}

export const DocsCard: FC<DocsCardProps> = ({ ...props }) => {
  return <Card bg={{ base: '#faf9f8', _dark: '#1e1d1c' }} {...props} />;
};
