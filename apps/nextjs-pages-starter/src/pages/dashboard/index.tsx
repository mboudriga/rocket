import { Card, Flex, Grid, Heading, Text } from '@rocket/ui';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { NextPageWithLayout } from '@/types/page';

interface DashboardStats {
  totalItems: number;
  recentActivity: number;
  completedTasks: number;
}

export const getServerSideProps: GetServerSideProps<{
  stats: DashboardStats;
}> = async () => {
  // Simulated server-side data fetch — replace with real DB/API call
  return {
    props: {
      stats: {
        totalItems: 42,
        recentActivity: 7,
        completedTasks: 28,
      },
    },
  };
};

const DashboardPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  stats,
}) => {
  return (
    <>
      <Head>
        <title>Dashboard | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <Heading size="xl">Dashboard</Heading>

        <Grid templateColumns={{ base: '1fr', tablet: 'repeat(3, 1fr)' }} gap="6">
          <Card>
            <Flex.V gap="1">
              <Text color="fg.muted" fontSize="sm">
                Total Items
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {stats.totalItems}
              </Text>
            </Flex.V>
          </Card>

          <Card>
            <Flex.V gap="1">
              <Text color="fg.muted" fontSize="sm">
                Recent Activity
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {stats.recentActivity}
              </Text>
            </Flex.V>
          </Card>

          <Card>
            <Flex.V gap="1">
              <Text color="fg.muted" fontSize="sm">
                Completed Tasks
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {stats.completedTasks}
              </Text>
            </Flex.V>
          </Card>
        </Grid>
      </Flex.V>
    </>
  );
};

DashboardPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
