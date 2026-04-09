import type { Metadata } from 'next';
import { CreateItemForm } from './_components/CreateItemForm';

export const metadata: Metadata = {
  title: 'New Item',
};

export default function NewItemPage() {
  return <CreateItemForm />;
}
