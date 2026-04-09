import { index, layout, prefix, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  ...prefix('dashboard', [
    layout('routes/dashboard/layout.tsx', [
      index('routes/dashboard/overview.tsx'),
      route('items', 'routes/dashboard/items.tsx'),
      route('items/new', 'routes/dashboard/items.new.tsx'),
      route('items/:itemId', 'routes/dashboard/items.$itemId.tsx'),
      route('settings', 'routes/dashboard/settings.tsx'),
    ]),
  ]),

  route('*', 'routes/catch-all.tsx'),
] satisfies RouteConfig;
