import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST /api/rsvp - Submit RSVP (public endpoint - no auth required)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      eventId,
      guestName,
      guestEmail,
      guestPhone,
      status,
      numberOfGuests,
      message,
      dietaryRestrictions,
    } = body

    // Validation
    if (!eventId || !guestName || !status) {
      return NextResponse.json(
        { error: "Event ID, numele și răspunsul sunt obligatorii" },
        { status: 400 }
      )
    }

    if (!["ATTENDING", "NOT_ATTENDING", "MAYBE"].includes(status)) {
      return NextResponse.json(
        { error: "Status RSVP invalid" },
        { status: 400 }
      )
    }

    // Check if event exists and is active
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Evenimentul nu a fost găsit" },
        { status: 404 }
      )
    }

    if (!event.isActive) {
      return NextResponse.json(
        { error: "Acest eveniment nu mai este activ" },
        { status: 400 }
      )
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        eventId,
        guestName,
        guestEmail: guestEmail || null,
        guestPhone: guestPhone || null,
        status,
        numberOfGuests: numberOfGuests || 1,
        message: message || null,
        dietaryRestrictions: dietaryRestrictions || null,
      }
    })

    return NextResponse.json({
      message: "Mulțumim pentru confirmare! Răspunsul tău a fost înregistrat.",
      rsvp
    }, { status: 201 })

  } catch (error) {
    console.error("POST /api/rsvp error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la înregistrarea răspunsului" },
      { status: 500 }
    )
  }
}
