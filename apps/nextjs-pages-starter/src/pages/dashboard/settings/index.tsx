import { Card, Flex, Heading, Switch, Text } from '@rocket/ui';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import type { NextPageWithLayout } from '@/types/page';

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings | Pages Starter</title>
      </Head>

      <Flex.V gap="6">
        <Heading size="xl">Settings</Heading>

        <Card>
          <Flex.V gap="4">
            <Flex.H justify="space-between" align="center">
              <Flex.V gap="0">
                <Text fontWeight="semibold">Email Notifications</Text>
                <Text color="fg.muted" fontSize="sm">
                  Receive email updates about your items
                </Text>
              </Flex.V>
              <Switch defaultChecked />
            </Flex.H>

            <Flex.H justify="space-between" align="center">
              <Flex.V gap="0">
                <Text fontWeight="semibold">Auto-archive</Text>
                <Text color="fg.muted" fontSize="sm">
                  Automatically archive completed items after 30 days
                </Text>
              </Flex.V>
              <Switch />
            </Flex.H>
          </Flex.V>
        </Card>
      </Flex.V>
    </>
  );
};

SettingsPage.getLayout = (page: ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default SettingsPage;
