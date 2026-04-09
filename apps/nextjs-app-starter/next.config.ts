import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@rocket/ui', '@chakra-ui/react', '@ark-ui/react', '@emotion/react'],
  outputFileTracingRoot: '../../',
};

export default nextConfig;
