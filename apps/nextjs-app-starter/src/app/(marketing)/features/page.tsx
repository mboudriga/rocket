import type { Metadata } from 'next';
import { FeaturesClient } from './_components/FeaturesClient';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the features of the Next.js App Starter',
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
