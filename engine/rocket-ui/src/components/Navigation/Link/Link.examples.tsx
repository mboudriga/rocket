import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuArrowRight, LuExternalLink, LuFileText, LuMail, LuPhone } from 'react-icons/lu';
import { Link } from './Link';

export const LinkExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Link href="#">Click me</Link>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="6" wrap="wrap">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Plain (default)
            </Text>
            <Link href="#" variant="plain">
              Plain link
            </Link>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Underline
            </Text>
            <Link href="#" variant="underline">
              Underline link
            </Link>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* External link */}
      <ExampleSection title="External Links">
        <Flex.H gap="4" wrap="wrap">
          <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
            <Flex.H gap="1" align="center">
              External link
              <LuExternalLink size={14} />
            </Flex.H>
          </Link>
        </Flex.H>
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <Flex.V gap="3">
          <Link href="#">
            <Flex.H gap="2" align="center">
              <LuMail size={16} />
              Email us
            </Flex.H>
          </Link>
          <Link href="#">
            <Flex.H gap="2" align="center">
              <LuPhone size={16} />
              Call us
            </Flex.H>
          </Link>
          <Link href="#">
            <Flex.H gap="2" align="center">
              <LuFileText size={16} />
              Documentation
            </Flex.H>
          </Link>
        </Flex.V>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.H gap="4" wrap="wrap">
          <Link href="#" color="blue.fg">
            Blue
          </Link>
          <Link href="#" color="green.fg">
            Green
          </Link>
          <Link href="#" color="purple.fg">
            Purple
          </Link>
          <Link href="#" color="red.fg">
            Red
          </Link>
          <Link href="#" color="fg.muted">
            Gray
          </Link>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Inline links */}
      <ExampleSection title="Use Case: Inline Links">
        <Text>
          Please read our <Link href="#">Terms of Service</Link> and{' '}
          <Link href="#">Privacy Policy</Link> before creating an account.
        </Text>
      </ExampleSection>

      {/* Use case: Navigation links */}
      <ExampleSection title="Use Case: Navigation Links">
        <Flex.H gap="6" wrap="wrap">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href="#"
              color="fg.muted"
              fontWeight="medium"
              _hover={{ color: 'blue.fg' }}
            >
              {item}
            </Link>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Use case: Link with arrow */}
      <ExampleSection title="Use Case: Call to Action">
        <Flex.V gap="3">
          <Link href="#" fontWeight="semibold">
            <Flex.H gap="1" align="center">
              Learn more
              <LuArrowRight size={16} />
            </Flex.H>
          </Link>
          <Link href="#" fontWeight="semibold" color="green.fg">
            <Flex.H gap="1" align="center">
              Get started
              <LuArrowRight size={16} />
            </Flex.H>
          </Link>
        </Flex.V>
      </ExampleSection>

      {/* Use case: Link box (clickable card) */}
      <ExampleSection title="Use Case: Link Box">
        <Link.Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          _hover={{ bg: 'bg.subtle', borderColor: 'blue.subtle' }}
          cursor="pointer"
          maxWidth="300px"
        >
          <Text fontWeight="semibold" marginBottom="1">
            Card Title
          </Text>
          <Text fontSize="sm" color="fg.muted" marginBottom="2">
            This entire card is clickable because it uses Link.Box.
          </Text>
          <Link href="#" color="blue.fg" fontSize="sm" fontWeight="medium">
            Read more
          </Link>
        </Link.Box>
      </ExampleSection>
    </Flex.V>
  );
};
