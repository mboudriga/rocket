import type { Metadata } from 'next';
import { AboutClient } from './_components/AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the Next.js App Starter',
};

export default function AboutPage() {
  return <AboutClient />;
}
