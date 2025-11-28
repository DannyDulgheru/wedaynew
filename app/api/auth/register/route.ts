import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Toate câmpurile sunt obligatorii" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Parola trebuie să aibă minim 8 caractere" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email-ul este deja înregistrat" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "CLIENT", // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      message: "Cont creat cu succes! Te poți autentifica acum.",
      user
    }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la înregistrare. Te rugăm să încerci din nou." },
      { status: 500 }
    )
  }
}
