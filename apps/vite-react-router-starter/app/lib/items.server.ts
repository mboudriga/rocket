import { type Item, getItems, setItems } from './db.server';

export function getAll(status?: Item['status']): Item[] {
  const items = getItems();
  if (status) {
    return items.filter((item) => item.status === status);
  }
  return items;
}

export function getById(id: string): Item | undefined {
  return getItems().find((item) => item.id === id);
}

export function create(data: Pick<Item, 'name' | 'description' | 'status'>): Item {
  const now = new Date().toISOString();
  const item: Item = {
    id: crypto.randomUUID(),
    name: data.name,
    description: data.description,
    status: data.status,
    createdAt: now,
    updatedAt: now,
  };
  setItems([...getItems(), item]);
  return item;
}

export function update(
  id: string,
  data: Partial<Pick<Item, 'name' | 'description' | 'status'>>,
): Item | undefined {
  const items = getItems();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;

  const existing = items[index]!;
  const updated: Item = {
    id: existing.id,
    name: data.name ?? existing.name,
    description: data.description ?? existing.description,
    status: data.status ?? existing.status,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const newItems = [...items];
  newItems[index] = updated;
  setItems(newItems);
  return updated;
}

export function remove(id: string): boolean {
  const items = getItems();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  setItems(filtered);
  return true;
}
