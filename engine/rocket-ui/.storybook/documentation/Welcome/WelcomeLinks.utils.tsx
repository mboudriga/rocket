import type { FC } from 'react';
import { LuClipboardList, LuRocket, LuRoute } from 'react-icons/lu';
import { SiReactquery, SiTestinglibrary, SiVitest, SiZod } from 'react-icons/si';

const SvgIcon: FC<{ src: string; alt: string }> = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} width="28" height="28" style={{ display: 'block' }} {...props} />
);

const ZustandIcon: FC = (props) => <SvgIcon src="zustand-plain.svg" alt="Zustand" {...props} />;
const PlaywrightIcon: FC = (props) => (
  <SvgIcon src="playwright-plain.svg" alt="Playwright" {...props} />
);

export const EXTERNAL_LINKS = [
  {
    name: 'TanStack Start',
    description:
      'Full-stack React framework with SSR, server functions and streaming. TanStack Start builds on TanStack Router for type-safe server rendering.',
    link: 'https://tanstack.com/start/latest/docs/framework/react/overview',
    icon: LuRocket,
  },
  {
    name: 'TanStack Router',
    description:
      'Type-safe routing for React with built-in search param validation. TanStack Router provides file-based routing and data loading.',
    link: 'https://tanstack.com/router/latest/docs/framework/react/overview',
    icon: LuRoute,
  },
  {
    name: 'TanStack Query',
    description:
      'Powerful server state management for React applications. TanStack Query simplifies data fetching, caching and synchronization.',
    link: 'https://tanstack.com/query/latest/docs/framework/react/overview',
    icon: SiReactquery,
  },
  {
    name: 'TanStack Form',
    description:
      'Type-safe form state management with built-in validation. TanStack Form provides a headless, framework-agnostic approach to complex forms.',
    link: 'https://tanstack.com/form/latest/docs/overview',
    icon: LuClipboardList,
  },
  {
    name: 'Zod',
    description:
      'TypeScript-first schema declaration and validation library. Zod is designed to be developer-friendly and highly composable.',
    link: 'https://zod.dev/?id=basic-usage',
    icon: SiZod,
  },
  {
    name: 'Zustand',
    description:
      'Lightweight client state management built on React hooks. Zustand requires minimal boilerplate and has a simple, intuitive API.',
    link: 'https://zustand.docs.pmnd.rs/',
    iconComponent: ZustandIcon,
  },
  {
    name: 'Vitest',
    description:
      'Next generation testing framework powered by Vite. Vitest provides a fast unit test runner with Jest-compatible syntax.',
    link: 'https://vitest.dev/api/expect.html',
    icon: SiVitest,
  },
  {
    name: 'React Testing Library',
    description:
      'Lightweight React DOM testing utilities for components. React Testing Library encourages testing the way users interact with your app.',
    link: 'https://testing-library.com/docs/queries/about',
    icon: SiTestinglibrary,
  },
  {
    name: 'Playwright',
    description:
      'End-to-end cross-browser automation testing framework. Playwright codegen writes tests by recording your browser actions.',
    link: 'https://playwright.dev/docs/test-assertions',
    iconComponent: PlaywrightIcon,
  },
];
