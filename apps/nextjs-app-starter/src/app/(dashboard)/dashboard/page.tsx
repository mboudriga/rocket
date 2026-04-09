import type { Metadata } from 'next';
import { DashboardClient } from './_components/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard',
};

async function getDashboardStats() {
  // Simulated server-side data fetch — replace with real DB/API call
  return {
    totalItems: 42,
    recentActivity: 7,
    completedTasks: 28,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
}
