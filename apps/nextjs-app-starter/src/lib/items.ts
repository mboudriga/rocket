export interface Item {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  createdAt: string;
}

/** Mock items — replace with real DB/API calls in production */
export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Item One',
    description: 'First item description',
    status: 'active',
    createdAt: '2026-04-01',
  },
  {
    id: '2',
    name: 'Item Two',
    description: 'Second item description',
    status: 'archived',
    createdAt: '2026-04-02',
  },
  {
    id: '3',
    name: 'Item Three',
    description: 'Third item description',
    status: 'active',
    createdAt: '2026-04-03',
  },
];

export function getItems(): Item[] {
  return MOCK_ITEMS;
}

export function getItemById(id: string): Item | undefined {
  return MOCK_ITEMS.find((item) => item.id === id);
}
