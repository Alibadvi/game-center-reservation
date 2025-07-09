// src/app/api/reserve/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
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

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
