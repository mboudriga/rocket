import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getItemById, getItems } from '@/lib/items';
import { ItemDetailClient } from './_components/ItemDetailClient';

export function generateStaticParams() {
  return getItems().map((item) => ({ itemId: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ itemId: string }>;
}): Promise<Metadata> {
  const { itemId } = await params;
  const item = getItemById(itemId);
  return { title: item?.name ?? `Item ${itemId}` };
}

export default async function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const item = getItemById(itemId);

  if (!item) {
    notFound();
  }

  return <ItemDetailClient item={item} />;
}
