import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/events - List all events (filtered by user role)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Nu ești autentificat" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") // PENDING, PAID, ACTIVE, EXPIRED
    const eventType = searchParams.get("eventType") // WEDDING, BIRTHDAY, etc.

    // Build where clause based on user role
    const where: any = {}

    // Clients see only their events, Admins see all
    if (session.user.role === "CLIENT") {
      where.userId = session.user.id
    }

    if (status) {
      where.orderStatus = status
    }

    if (eventType) {
      where.eventType = eventType
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
            eventType: true,
          }
        },
        _count: {
          select: {
            rsvps: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({ events })

  } catch (error) {
    console.error("GET /api/events error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la încărcarea evenimentelor" },
      { status: 500 }
    )
  }
}

// POST /api/events - Create new event
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Nu ești autentificat" },
        { status: 401 }
      )
    }

    // Only clients can create events
    if (session.user.role !== "CLIENT") {
      return NextResponse.json(
        { error: "Doar clienții pot crea evenimente" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const {
      templateId,
      eventType,
      eventTitle,
      eventDate,
      eventLocation,
      customContent,
      publicLink,
    } = body

    // Validation
    if (!templateId || !eventType || !eventTitle || !eventDate || !publicLink) {
      return NextResponse.json(
        { error: "Toate câmpurile obligatorii trebuie completate" },
        { status: 400 }
      )
    }

    // Check if publicLink is unique
    const existingEvent = await prisma.event.findUnique({
      where: { publicLink }
    })

    if (existingEvent) {
      return NextResponse.json(
        { error: "Acest link public este deja folosit. Alege altul." },
        { status: 400 }
      )
    }

    // Check if template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template-ul selectat nu există" },
        { status: 404 }
      )
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        userId: session.user.id,
        templateId,
        eventType,
        eventTitle,
        eventDate: new Date(eventDate),
        eventLocation: eventLocation || null,
        customContent: customContent || {},
        publicLink,
        orderStatus: "PENDING",
        isActive: true,
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
          }
        }
      }
    })

    return NextResponse.json({
      message: "Eveniment creat cu succes!",
      event
    }, { status: 201 })

  } catch (error) {
    console.error("POST /api/events error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la crearea evenimentului" },
      { status: 500 }
    )
  }
}
