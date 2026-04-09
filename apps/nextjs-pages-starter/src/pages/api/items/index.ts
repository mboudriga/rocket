import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getItems } from '@/lib/items';

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(getItems());
  }

  if (req.method === 'POST') {
    const parsed = createSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const newItem = {
      id: crypto.randomUUID(),
      ...parsed.data,
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0],
    };

    return res.status(201).json(newItem);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).end();
}
