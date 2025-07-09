import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, price } = await req.json();
  if (!name || typeof price !== 'number') return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

  const product = await prisma.product.create({
    data: { name, price },
  });

  return NextResponse.json(product);
}

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}
