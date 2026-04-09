import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuChevronRight, LuHouse, LuSlash } from 'react-icons/lu';
import { Breadcrumb } from './Breadcrumb';

export const BreadcrumbExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Breadcrumb
          items={[
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', current: true },
          ]}
        />
      </ExampleSection>

      {/* Custom separators */}
      <ExampleSection title="Custom Separators">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Chevron
            </Text>
            <Breadcrumb
              separator={<LuChevronRight size={14} />}
              items={[
                { label: 'Home', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Item', current: true },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Slash
            </Text>
            <Breadcrumb
              separator={<LuSlash size={14} />}
              items={[
                { label: 'Home', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Item', current: true },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Text
            </Text>
            <Breadcrumb
              separator=">"
              items={[
                { label: 'Home', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Item', current: true },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Dot
            </Text>
            <Breadcrumb
              separator="•"
              items={[
                { label: 'Home', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Item', current: true },
              ]}
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {size}
              </Text>
              <Breadcrumb
                size={size}
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Products', href: '#' },
                  { label: 'Item', current: true },
                ]}
              />
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use case: E-commerce */}
      <ExampleSection title="Use Case: E-commerce">
        <Box padding="4" bg="bg.subtle" borderRadius="md">
          <Breadcrumb
            separator={<LuChevronRight size={14} />}
            items={[
              { label: 'Shop', href: '#' },
              { label: 'Electronics', href: '#' },
              { label: 'Computers', href: '#' },
              { label: 'Laptops', href: '#' },
              { label: 'MacBook Pro 16"', current: true },
            ]}
          />
          <Text fontWeight="bold" fontSize="xl" marginTop="4">
            MacBook Pro 16"
          </Text>
          <Text color="fg.muted">Apple M3 Pro, 512GB SSD</Text>
        </Box>
      </ExampleSection>

      {/* Use case: Documentation */}
      <ExampleSection title="Use Case: Documentation">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="md">
          <Breadcrumb
            separator="/"
            items={[
              { label: 'Docs', href: '#' },
              { label: 'Components', href: '#' },
              { label: 'Navigation', href: '#' },
              { label: 'Breadcrumb', current: true },
            ]}
          />
          <Text fontWeight="bold" fontSize="lg" marginTop="4">
            Breadcrumb Component
          </Text>
          <Text fontSize="sm" color="fg.muted">
            A breadcrumb displays the current page location within a hierarchy.
          </Text>
        </Box>
      </ExampleSection>

      {/* Use case: Dashboard */}
      <ExampleSection title="Use Case: Dashboard">
        <Box padding="4" bg="bg" borderRadius="md" boxShadow="sm">
          <Flex.H align="center" gap="2" marginBottom="2">
            <LuHouse size={16} />
            <Breadcrumb
              separator={<LuChevronRight size={12} />}
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Settings', href: '#' },
                { label: 'Profile', current: true },
              ]}
            />
          </Flex.H>
          <Text fontWeight="semibold" marginTop="3">
            Profile Settings
          </Text>
          <Text fontSize="sm" color="fg.muted">
            Manage your account information
          </Text>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
