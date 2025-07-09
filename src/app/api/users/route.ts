import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { role: 'CUSTOMER' },
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { phone: { contains: query } },
          ],
        },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users);
}
