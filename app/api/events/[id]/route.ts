import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/events/[id] - Get event details
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Nu ești autentificat" },
        { status: 401 }
      )
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        template: true,
        rsvps: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Evenimentul nu a fost găsit" },
        { status: 404 }
      )
    }

    // Check permissions: Clients can only see their own events, Admins see all
    if (session.user.role === "CLIENT" && event.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Nu ai permisiunea să vezi acest eveniment" },
        { status: 403 }
      )
    }

    return NextResponse.json({ event })

  } catch (error) {
    console.error("GET /api/events/[id] error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la încărcarea evenimentului" },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Nu ești autentificat" },
        { status: 401 }
      )
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Evenimentul nu a fost găsit" },
        { status: 404 }
      )
    }

    // Check permissions
    if (session.user.role === "CLIENT" && event.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Nu ai permisiunea să modifici acest eveniment" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const {
      eventTitle,
      eventDate,
      eventLocation,
      customContent,
      publicLink,
      orderStatus,
      isActive,
    } = body

    // If publicLink is being changed, check uniqueness
    if (publicLink && publicLink !== event.publicLink) {
      const existingEvent = await prisma.event.findUnique({
        where: { publicLink }
      })

      if (existingEvent) {
        return NextResponse.json(
          { error: "Acest link public este deja folosit" },
          { status: 400 }
        )
      }
    }

    // Build update data
    const updateData: any = {}

    if (eventTitle) updateData.eventTitle = eventTitle
    if (eventDate) updateData.eventDate = new Date(eventDate)
    if (eventLocation !== undefined) updateData.eventLocation = eventLocation
    if (customContent) updateData.customContent = customContent
    if (publicLink) updateData.publicLink = publicLink

    // Only admins can change orderStatus and isActive
    if (session.user.role === "ADMIN") {
      if (orderStatus) updateData.orderStatus = orderStatus
      if (isActive !== undefined) updateData.isActive = isActive
    }

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: updateData,
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
      message: "Eveniment actualizat cu succes!",
      event: updatedEvent
    })

  } catch (error) {
    console.error("PUT /api/events/[id] error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la actualizarea evenimentului" },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Nu ești autentificat" },
        { status: 401 }
      )
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Evenimentul nu a fost găsit" },
        { status: 404 }
      )
    }

    // Check permissions: Clients can delete their own, Admins can delete any
    if (session.user.role === "CLIENT" && event.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Nu ai permisiunea să ștergi acest eveniment" },
        { status: 403 }
      )
    }

    // Delete event (CASCADE will delete RSVPs automatically)
    await prisma.event.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: "Eveniment șters cu succes!"
    })

  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la ștergerea evenimentului" },
      { status: 500 }
    )
  }
}
