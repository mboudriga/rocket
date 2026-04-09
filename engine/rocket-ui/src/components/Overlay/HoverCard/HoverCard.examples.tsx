import { ExampleSection } from '@components/_examples';
import { Badge } from '@components/Display/Badge';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCalendar, LuLink, LuMapPin, LuUser } from 'react-icons/lu';
import { HoverCard } from './HoverCard';

export const HoverCardExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <HoverCard
          trigger={
            <Text as="span" textDecoration="underline" cursor="pointer" color="blue.fg">
              Hover over me
            </Text>
          }
        >
          <Text>This is a hover card that appears when you hover over the trigger.</Text>
        </HoverCard>
      </ExampleSection>

      {/* With/without arrow */}
      <ExampleSection title="Arrow Options">
        <Flex.H gap="6" wrap="wrap">
          <HoverCard
            hasArrow
            trigger={
              <Text as="span" textDecoration="underline" cursor="pointer" color="blue.fg">
                With Arrow
              </Text>
            }
          >
            <Text>Hover card with arrow pointer.</Text>
          </HoverCard>
          <HoverCard
            hasArrow={false}
            trigger={
              <Text as="span" textDecoration="underline" cursor="pointer" color="blue.fg">
                Without Arrow
              </Text>
            }
          >
            <Text>Hover card without arrow.</Text>
          </HoverCard>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: User profile preview */}
      <ExampleSection title="Use Case: User Profile Preview">
        <Text>
          Check out the profile of{' '}
          <HoverCard
            hasArrow
            trigger={
              <Text as="span" fontWeight="semibold" color="blue.fg" cursor="pointer">
                @johndoe
              </Text>
            }
          >
            <Flex.V gap="3">
              <Flex.H gap="3" align="center">
                <Box
                  width="48px"
                  height="48px"
                  borderRadius="full"
                  bg="blue.subtle"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LuUser size={24} />
                </Box>
                <Box>
                  <Text fontWeight="semibold">John Doe</Text>
                  <Text fontSize="sm" color="fg.muted">
                    @johndoe
                  </Text>
                </Box>
              </Flex.H>
              <Text fontSize="sm">
                Full-stack developer passionate about building great user experiences.
              </Text>
              <Flex.H gap="4" fontSize="sm" color="fg.muted">
                <Flex.H gap="1" align="center">
                  <LuMapPin size={14} />
                  <Text>San Francisco</Text>
                </Flex.H>
                <Flex.H gap="1" align="center">
                  <LuCalendar size={14} />
                  <Text>Joined 2020</Text>
                </Flex.H>
              </Flex.H>
              <Flex.H gap="4" fontSize="sm">
                <Text>
                  <b>1.2k</b> followers
                </Text>
                <Text>
                  <b>500</b> following
                </Text>
              </Flex.H>
            </Flex.V>
          </HoverCard>{' '}
          for more info.
        </Text>
      </ExampleSection>

      {/* Use case: Link preview */}
      <ExampleSection title="Use Case: Link Preview">
        <Text>
          Read this article:{' '}
          <HoverCard
            hasArrow
            trigger={
              <Text as="span" color="blue.fg" cursor="pointer" textDecoration="underline">
                Getting Started with React
              </Text>
            }
          >
            <Flex.V gap="3" maxWidth="300px">
              <Box
                height="120px"
                bg="bg.muted"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <LuLink size={32} />
              </Box>
              <Box>
                <Text fontWeight="semibold">Getting Started with React</Text>
                <Text fontSize="sm" color="fg.muted" marginTop="1">
                  A comprehensive guide to building your first React application from scratch.
                </Text>
              </Box>
              <Text fontSize="xs" color="fg.muted">
                reactjs.org
              </Text>
            </Flex.V>
          </HoverCard>
        </Text>
      </ExampleSection>

      {/* Use case: Product preview */}
      <ExampleSection title="Use Case: Product Preview">
        <Flex.H gap="4">
          {[
            {
              name: 'Premium Plan',
              price: '$29/mo',
              features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
            },
            {
              name: 'Team Plan',
              price: '$99/mo',
              features: ['Up to 10 members', 'Shared workspace', 'Admin controls'],
            },
          ].map((product, i) => (
            <HoverCard
              key={i}
              hasArrow
              trigger={
                <Box
                  padding="3"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ borderColor: 'blue.muted' }}
                >
                  <Text fontWeight="semibold">{product.name}</Text>
                  <Text color="fg.muted">{product.price}</Text>
                </Box>
              }
            >
              <Flex.V gap="3" width="220px">
                <Box>
                  <Flex.H justify="space-between" align="center">
                    <Text fontWeight="semibold">{product.name}</Text>
                    <Badge colorPalette="blue">{product.price}</Badge>
                  </Flex.H>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" marginBottom="2">
                    Features:
                  </Text>
                  <Flex.V gap="1">
                    {product.features.map((feature, j) => (
                      <Text key={j} fontSize="sm" color="fg.muted">
                        • {feature}
                      </Text>
                    ))}
                  </Flex.V>
                </Box>
                <Button size="sm" colorPalette="blue" width="full">
                  Learn More
                </Button>
              </Flex.V>
            </HoverCard>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Use case: Term definition */}
      <ExampleSection title="Use Case: Term Definitions">
        <Text lineHeight="tall">
          The{' '}
          <HoverCard
            hasArrow
            trigger={
              <Text as="span" borderBottom="1px dashed" borderColor="border" cursor="help">
                API
              </Text>
            }
          >
            <Box maxWidth="250px">
              <Text fontWeight="semibold" marginBottom="1">
                API
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Application Programming Interface - a set of protocols and tools for building
                software applications.
              </Text>
            </Box>
          </HoverCard>{' '}
          allows you to interact with the server using{' '}
          <HoverCard
            hasArrow
            trigger={
              <Text as="span" borderBottom="1px dashed" borderColor="border" cursor="help">
                REST
              </Text>
            }
          >
            <Box maxWidth="250px">
              <Text fontWeight="semibold" marginBottom="1">
                REST
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Representational State Transfer - an architectural style for designing networked
                applications.
              </Text>
            </Box>
          </HoverCard>{' '}
          endpoints.
        </Text>
      </ExampleSection>
    </Flex.V>
  );
};
