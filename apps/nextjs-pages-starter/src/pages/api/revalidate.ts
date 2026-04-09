import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { path, secret } = req.body as { path?: string; secret?: string };

  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  if (!path) {
    return res.status(400).json({ message: 'Path is required' });
  }

  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
