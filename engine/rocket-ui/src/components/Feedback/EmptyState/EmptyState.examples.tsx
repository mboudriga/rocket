import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { LuFileText, LuInbox, LuSearch, LuShoppingCart } from 'react-icons/lu';
import { EmptyState } from './EmptyState';

export const EmptyStateExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box padding="6" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <EmptyState
            title="No items found"
            description="There are no items to display at the moment."
          />
        </Box>
      </ExampleSection>

      {/* With icon */}
      <ExampleSection title="With Icon">
        <Box padding="6" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <EmptyState
            icon={<LuInbox size={48} />}
            title="Your inbox is empty"
            description="You have no new messages at this time."
          />
        </Box>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap">
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="250px">
            <Flex align="center" justify="center">
              <EmptyState
                size="sm"
                icon={<LuInbox size={32} />}
                title="Small"
                description="Small size empty state"
              />
            </Flex>
          </Box>
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="300px">
            <Flex align="center" justify="center">
              <EmptyState
                size="md"
                icon={<LuInbox size={40} />}
                title="Medium"
                description="Medium size empty state"
              />
            </Flex>
          </Box>
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="350px">
            <Flex align="center" justify="center">
              <EmptyState
                size="lg"
                icon={<LuInbox size={48} />}
                title="Large"
                description="Large size empty state"
              />
            </Flex>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* With action */}
      <ExampleSection title="With Action">
        <Box padding="6" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <EmptyState
            icon={<LuFileText size={48} />}
            title="No documents"
            description="You haven't created any documents yet. Get started by creating your first document."
          >
            <Button colorPalette="blue" marginTop="4">
              Create Document
            </Button>
          </EmptyState>
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: Search results */}
      <ExampleSection title="Use Case: No Search Results">
        <Box padding="6" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="450px">
          <EmptyState
            icon={<LuSearch size={48} />}
            title="No results found"
            description="We couldn't find anything matching your search. Try different keywords or filters."
          >
            <Button variant="outline" marginTop="4">
              Clear Search
            </Button>
          </EmptyState>
        </Box>
      </ExampleSection>

      {/* Use case: Shopping cart */}
      <ExampleSection title="Use Case: Empty Cart">
        <Box padding="6" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <EmptyState
            icon={<LuShoppingCart size={48} />}
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet."
          >
            <Button colorPalette="blue" marginTop="4">
              Continue Shopping
            </Button>
          </EmptyState>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
