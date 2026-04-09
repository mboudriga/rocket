import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getItemById } from '@/lib/items';

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'archived']).optional(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawId = req.query.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const item = id ? getItemById(id) : undefined;

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(item);
  }

  if (req.method === 'PUT') {
    const parsed = updateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const updated = { ...item, ...parsed.data };
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ message: 'Item deleted', id: item.id });
  }

  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(405).end();
}
