import { Box, CloseButton, Flex, Spinner, Text } from '@chakra-ui/react';
import { LuCircleCheck, LuCircleX, LuInfo, LuTriangleAlert } from 'react-icons/lu';

const icons = { success: LuCircleCheck, error: LuCircleX, warning: LuTriangleAlert, info: LuInfo };
const palettes = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
  loading: 'gray',
};

interface ChakraToastProps {
  title: string;
  description?: string;
  status: 'success' | 'error' | 'warning' | 'info' | 'loading';
  closeToast?: () => void;
}

export function ChakraToast({ title, description, status, closeToast }: ChakraToastProps) {
  const Icon = icons[status as keyof typeof icons];
  const palette = palettes[status];

  return (
    <Box
      colorPalette={palette}
      bg="bg"
      borderRadius="md"
      p={3}
      boxShadow="lg"
      border="1px solid"
      borderColor="border"
      minW="300px"
      maxW="400px"
    >
      <Flex align="flex-start" gap={3}>
        <Box color={`${palette}.500`} flexShrink={0} mt={0.5}>
          {status === 'loading' ? <Spinner size="sm" /> : Icon && <Icon size={20} />}
        </Box>
        <Box flex={1}>
          <Text fontWeight="semibold">{title}</Text>
          {description && (
            <Text fontSize="sm" color="fg.muted" mt={1}>
              {description}
            </Text>
          )}
        </Box>
        <CloseButton size="sm" onClick={closeToast} />
      </Flex>
    </Box>
  );
}
