export interface Item {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
  updatedAt: string;
}

let items: Item[] = [
  { id: 'item-01', name: 'Project Alpha', description: 'Initial project setup and scaffolding', status: 'active', createdAt: '2025-01-15T09:00:00Z', updatedAt: '2025-03-10T14:30:00Z' },
  { id: 'item-02', name: 'Budget Report Q1', description: 'Quarterly budget analysis and forecasting', status: 'active', createdAt: '2025-01-20T10:00:00Z', updatedAt: '2025-03-28T11:00:00Z' },
  { id: 'item-03', name: 'Design System v2', description: 'Component library redesign with new tokens', status: 'active', createdAt: '2025-02-01T08:30:00Z', updatedAt: '2025-03-15T16:45:00Z' },
  { id: 'item-04', name: 'API Gateway Migration', description: 'Migrate from REST to GraphQL gateway', status: 'draft', createdAt: '2025-02-05T11:00:00Z', updatedAt: '2025-02-05T11:00:00Z' },
  { id: 'item-05', name: 'User Onboarding Flow', description: 'Redesign the new user onboarding experience', status: 'active', createdAt: '2025-02-10T09:15:00Z', updatedAt: '2025-03-20T10:30:00Z' },
  { id: 'item-06', name: 'Performance Audit', description: 'Core Web Vitals optimization across all pages', status: 'archived', createdAt: '2025-02-12T14:00:00Z', updatedAt: '2025-03-01T09:00:00Z' },
  { id: 'item-07', name: 'Mobile App v3', description: 'React Native app major version upgrade', status: 'draft', createdAt: '2025-02-15T08:00:00Z', updatedAt: '2025-02-20T13:00:00Z' },
  { id: 'item-08', name: 'CI/CD Pipeline', description: 'GitHub Actions workflow optimization', status: 'active', createdAt: '2025-02-18T10:30:00Z', updatedAt: '2025-03-25T15:00:00Z' },
  { id: 'item-09', name: 'Data Analytics Dashboard', description: 'Real-time metrics visualization with charts', status: 'active', createdAt: '2025-02-22T09:00:00Z', updatedAt: '2025-03-18T12:00:00Z' },
  { id: 'item-10', name: 'Security Compliance', description: 'SOC 2 Type II audit preparation', status: 'archived', createdAt: '2025-02-25T11:30:00Z', updatedAt: '2025-03-05T16:00:00Z' },
  { id: 'item-11', name: 'Search Infrastructure', description: 'Elasticsearch cluster setup and indexing', status: 'draft', createdAt: '2025-03-01T08:00:00Z', updatedAt: '2025-03-01T08:00:00Z' },
  { id: 'item-12', name: 'Email Templates', description: 'Transactional email redesign with MJML', status: 'active', createdAt: '2025-03-03T10:00:00Z', updatedAt: '2025-03-22T14:30:00Z' },
  { id: 'item-13', name: 'Localization Setup', description: 'i18n framework integration for 12 languages', status: 'draft', createdAt: '2025-03-05T09:30:00Z', updatedAt: '2025-03-10T11:00:00Z' },
  { id: 'item-14', name: 'Payment Integration', description: 'Stripe payment processing and webhooks', status: 'active', createdAt: '2025-03-07T13:00:00Z', updatedAt: '2025-03-27T10:00:00Z' },
  { id: 'item-15', name: 'Documentation Site', description: 'Astro-based docs with MDX content', status: 'active', createdAt: '2025-03-10T08:45:00Z', updatedAt: '2025-03-26T15:30:00Z' },
  { id: 'item-16', name: 'Feature Flags System', description: 'LaunchDarkly integration with React hooks', status: 'archived', createdAt: '2025-03-12T10:00:00Z', updatedAt: '2025-03-20T09:00:00Z' },
  { id: 'item-17', name: 'Accessibility Audit', description: 'WCAG 2.1 AA compliance review and fixes', status: 'active', createdAt: '2025-03-14T11:00:00Z', updatedAt: '2025-03-29T13:00:00Z' },
  { id: 'item-18', name: 'Monitoring & Alerts', description: 'Datadog APM and custom alert rules', status: 'draft', createdAt: '2025-03-16T09:00:00Z', updatedAt: '2025-03-16T09:00:00Z' },
  { id: 'item-19', name: 'Database Sharding', description: 'PostgreSQL horizontal partitioning strategy', status: 'archived', createdAt: '2025-03-18T14:00:00Z', updatedAt: '2025-03-25T11:30:00Z' },
  { id: 'item-20', name: 'Team Knowledge Base', description: 'Internal wiki with Notion API integration', status: 'active', createdAt: '2025-03-20T08:30:00Z', updatedAt: '2025-03-30T16:00:00Z' },
];

export function getItems(): Item[] {
  return items;
}

export function setItems(newItems: Item[]): void {
  items = newItems;
}
