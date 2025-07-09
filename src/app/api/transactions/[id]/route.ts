import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    await prisma.$transaction([
      prisma.transaction.deleteMany({
        where: { userId },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { balance: 0 },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in reset balance:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
