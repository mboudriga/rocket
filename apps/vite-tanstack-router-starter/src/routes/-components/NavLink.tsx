import { Flex, Text } from '@rocket/ui';
import type { LinkProps } from '@tanstack/react-router';
import { Link, useMatchRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface NavLinkProps {
  to: LinkProps['to'];
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export function NavLink({ to, icon, children, onClick }: NavLinkProps) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: true });

  return (
    <Link to={to} onClick={onClick}>
      <Flex
        align="center"
        gap="3"
        py="2"
        px="3"
        borderRadius="md"
        bg={isActive ? { base: 'blue.50', _dark: 'blue.900/30' } : 'transparent'}
        color={isActive ? { base: 'blue.700', _dark: 'blue.300' } : 'inherit'}
        _hover={{ bg: { base: 'gray.100', _dark: 'gray.800' } }}
        transition="all 0.15s"
      >
        {icon}
        <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
}
