import type { Metadata } from 'next';
import { HomeClient } from './_components/HomeClient';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return <HomeClient />;
}
