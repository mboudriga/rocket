import { Flex, Image, Text } from '@rocket/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuBox, LuLayoutDashboard, LuPlus, LuSettings } from 'react-icons/lu';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard /> },
  { href: '/dashboard/items', label: 'Items', icon: <LuBox /> },
  { href: '/items/new', label: 'New Item', icon: <LuPlus /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <LuSettings /> },
] as const;

export function Sidebar() {
  const router = useRouter();

  return (
    <Flex.V
      as="nav"
      w="240px"
      minH="100vh"
      bg="bg.panel"
      borderRight="1px solid"
      borderColor="border"
      p="4"
      gap="6"
      flexShrink={0}
    >
      <Flex.H asChild align="center" gap="3" px="2" _hover={{ opacity: 0.8 }}>
        <Link href="/">
          <Image src="/favicon.svg" alt="Rocket" height="28px" width="auto" />
          <Text fontWeight="semibold" fontSize="md">
            Pages Starter
          </Text>
        </Link>
      </Flex.H>

      <Flex.V gap="1">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Flex.H
              key={item.href}
              asChild
              gap="3"
              align="center"
              px="3"
              py="2"
              borderRadius="md"
              bg={isActive ? 'bg.subtle' : undefined}
              _hover={{ bg: 'bg.subtle' }}
            >
              <Link href={item.href}>
                <Text color={isActive ? 'fg' : 'fg.muted'}>{item.icon}</Text>
                <Text
                  fontSize="sm"
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  color={isActive ? 'fg' : 'fg.muted'}
                >
                  {item.label}
                </Text>
              </Link>
            </Flex.H>
          );
        })}
      </Flex.V>
    </Flex.V>
  );
}
