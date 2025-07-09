import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, phone, password } = await req.json();

    if (!name || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return NextResponse.json({ error: 'Phone already registered.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role: 'CUSTOMER', // make sure your Prisma model has a default or enum
        balance: 0,
      },
    });

    return NextResponse.json({
      message: 'User registered.',
      user: { id: user.id, name: user.name },
    });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
