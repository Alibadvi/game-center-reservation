import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, amount, reason } = await req.json();

  if (!userId || typeof amount !== 'number') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId,
          amount,
          reason,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      }),
    ]);

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Transaction error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
