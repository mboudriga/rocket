import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getItems } from '@/lib/items';

export function GET() {
  return NextResponse.json(getItems());
}

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Simulate creation — replace with real DB call
  const newItem = {
    id: crypto.randomUUID(),
    ...parsed.data,
    status: 'active' as const,
    createdAt: new Date().toISOString().split('T')[0],
  };

  return NextResponse.json(newItem, { status: 201 });
}
