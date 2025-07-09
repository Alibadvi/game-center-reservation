import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { name, price } = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { name, price },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ success: true });
}
