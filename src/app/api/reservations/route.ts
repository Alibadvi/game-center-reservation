// src/app/api/reservations/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: fetch all reservations (for admin use)
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

// POST: create a reservation (for logged-in user)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      device,
      sessionType,
      date,
      chairs,
      price,
    } = body;

    if (!userId || !device || !sessionType || !date || !chairs || !price) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        device,
        sessionType,
        date: new Date(date),
        chairs,
        price,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Reservation creation error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
