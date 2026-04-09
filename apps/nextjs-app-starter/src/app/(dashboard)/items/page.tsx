import type { Metadata } from 'next';
import { getItems } from '@/lib/items';
import { ItemsListClient } from './_components/ItemsListClient';

export const metadata: Metadata = {
  title: 'Items',
};

export default function ItemsPage() {
  const items = getItems();
  return <ItemsListClient items={items} />;
}
