# 📋 TODO LIST - BACKEND IMPLEMENTATION

**Data**: 28 Noiembrie 2025  
**Obiectiv**: Completarea backend-ului pentru aplicația Weday

---

## 🔥 FAZA 1: SETUP INIȚIAL (2-3 ore)

### ✅ Task 1.1: Configurare Bază de Date PostgreSQL
**Timp estimat**: 30 min  
**Prioritate**: 🔴 MAXIMĂ

**Pași**:
```bash
# Windows - cu PostgreSQL instalat
psql -U postgres
CREATE DATABASE weday_db;
CREATE USER weday_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE weday_db TO weday_user;
\q

# Sau folosește pgAdmin GUI
```

**Verificare**:
```bash
psql -U weday_user -d weday_db
\dt  # Ar trebui să fie gol deocamdată
```

**Status**: [ ] TO DO

---

### ✅ Task 1.2: Configurare .env
**Timp estimat**: 15 min  
**Prioritate**: 🔴 MAXIMĂ

**Creează fișier**: `.env.local` (la root)

```env
# Database
DATABASE_URL="postgresql://weday_user:secure_password_123@localhost:5432/weday_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_cu_comanda_de_mai_jos"

# Email (Gmail example)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-gmail-app-password"
EMAIL_FROM="noreply@weday.md"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generare NEXTAUTH_SECRET**:
```bash
# PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Sau online: https://generate-secret.vercel.app/32
```

**Verificare**:
```bash
# Fișierul .env.local ar trebui ignorat de Git
git status  # Nu ar trebui să apară .env.local
```

**Status**: [ ] TO DO

---

### ✅ Task 1.3: Generare Prisma Client
**Timp estimat**: 5 min  
**Prioritate**: 🔴 MAXIMĂ

```bash
# Generează Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Verifică în Prisma Studio
npx prisma studio
# Opens at http://localhost:5555
```

**Verificare erorilor**:
```bash
# Ar trebui să dispară erorile:
# - Module '@prisma/client' has no exported member 'PrismaClient'
# - Module '@prisma/client' has no exported member 'EventType'
# - Module '@prisma/client' has no exported member 'UserRole'
```

**Status**: [ ] TO DO

---

### ✅ Task 1.4: Seed Database
**Timp estimat**: 10 min  
**Prioritate**: 🟡 MEDIE

```bash
# Rulează seed script
npm run db:seed

# Verifică datele în Prisma Studio
npx prisma studio
```

**Datele create**:
- 1 Admin user: admin@weday.md / admin123
- 1 Client user: client@weday.md / client123
- 5 Template-uri (câte 1 per event type)
- 3 Evenimente demo
- 10 RSVP-uri demo

**Status**: [ ] TO DO

---

## 🔥 FAZA 2: API ROUTES - AUTHENTICATION (3-4 ore)

### ✅ Task 2.1: NextAuth API Route
**Timp estimat**: 1 oră  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `app/api/auth/[...nextauth]/route.ts`

```typescript
import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

**Verificare**:
- GET http://localhost:3000/api/auth/session → 401 sau session data
- POST http://localhost:3000/api/auth/signin/credentials
- GET http://localhost:3000/api/auth/providers

**Testare**:
1. Mergi la http://localhost:3000/auth/login
2. Încearcă login cu admin@weday.md / admin123
3. Ar trebui să te redirecteze la /admin/dashboard

**Status**: [ ] TO DO

---

### ✅ Task 2.2: Register API Route
**Timp estimat**: 45 min  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `app/api/auth/register/route.ts`

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
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
        email,
        password: hashedPassword,
        role: "CLIENT", // Default role
      }
    })

    return NextResponse.json({
      message: "Cont creat cu succes",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare la înregistrare" },
      { status: 500 }
    )
  }
}
```

**Testare**:
```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"test@test.com","password":"Test1234"}'
```

**Status**: [ ] TO DO

---

### ✅ Task 2.3: Forgot Password API Route
**Timp estimat**: 1 oră  
**Prioritate**: 🟡 MEDIE

**Creează**: `app/api/auth/forgot-password/route.ts`

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({
        message: "Dacă există un cont cu acest email, vei primi un link de resetare."
      })
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3600000) // 1 hour

    // Save token (need to add PasswordResetToken model to schema)
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      }
    })

    // Send email
    await sendPasswordResetEmail(email, token)

    return NextResponse.json({
      message: "Email de resetare trimis cu succes"
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

### ✅ Task 2.4: Reset Password API Route
**Timp estimat**: 45 min  
**Prioritate**: 🟡 MEDIE

**Creează**: `app/api/auth/reset-password/route.ts`

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    // Find valid token
    const resetToken = await prisma.verificationToken.findUnique({
      where: { token }
    })

    if (!resetToken || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Token invalid sau expirat" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.identifier },
      data: { password: hashedPassword }
    })

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token }
    })

    return NextResponse.json({
      message: "Parola a fost resetată cu succes"
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

## 🔥 FAZA 3: API ROUTES - EVENTS (2-3 ore)

### ✅ Task 3.1: Events List & Create
**Timp estimat**: 1 oră  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `app/api/events/route.ts`

```typescript
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/events - List all events (filtered by user)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    const where = session.user.role === "ADMIN" 
      ? (userId ? { userId } : {})
      : { userId: session.user.id }

    const events = await prisma.event.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true }
        },
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error("Get events error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}

// POST /api/events - Create new event
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, eventType, date, time, location, description, templateId, sections } = body

    const event = await prisma.event.create({
      data: {
        title,
        eventType,
        date: new Date(date),
        time,
        location,
        description,
        userId: session.user.id,
        templateId,
        sections: sections || [], // JSON field
        status: "DRAFT",
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

### ✅ Task 3.2: Event Details, Update, Delete
**Timp estimat**: 1 oră  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `app/api/events/[id]/route.ts`

```typescript
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/events/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { name: true, email: true }
        },
        rsvps: true,
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Check ownership
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    if (existingEvent.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const event = await prisma.event.update({
      where: { id: params.id },
      data: body
    })

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    if (event.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.event.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Event deleted" })
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

## 🔥 FAZA 4: API ROUTES - RSVP & TEMPLATES (2 ore)

### ✅ Task 4.1: RSVP Submit
**Timp estimat**: 45 min  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `app/api/rsvp/route.ts`

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { eventId, guestName, guestEmail, status, guests, message } = body

    const rsvp = await prisma.rSVP.create({
      data: {
        eventId,
        guestName,
        guestEmail,
        status,
        numberOfGuests: guests || 1,
        message,
      }
    })

    // TODO: Send confirmation email

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    console.error("RSVP error:", error)
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

### ✅ Task 4.2: Get RSVPs for Event
**Timp estimat**: 30 min  
**Prioritate**: 🟡 MEDIE

**Creează**: `app/api/rsvp/[eventId]/route.ts`

```typescript
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { eventId: params.eventId },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(rsvps)
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

### ✅ Task 4.3: Templates API
**Timp estimat**: 45 min  
**Prioritate**: 🟡 MEDIE

**Creează**: `app/api/templates/route.ts`

```typescript
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const eventType = searchParams.get("eventType")

    const where = eventType ? { eventType } : {}

    const templates = await prisma.template.findMany({
      where,
      orderBy: { name: "asc" }
    })

    return NextResponse.json(templates)
  } catch (error) {
    return NextResponse.json(
      { error: "A apărut o eroare" },
      { status: 500 }
    )
  }
}
```

**Status**: [ ] TO DO

---

## 🔥 FAZA 5: MIDDLEWARE & PROTECTION (1 oră)

### ✅ Task 5.1: Create Middleware
**Timp estimat**: 30 min  
**Prioritate**: 🔴 MAXIMĂ

**Creează**: `middleware.ts` (la root)

```typescript
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Admin routes - require ADMIN role
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
    }

    // Client routes - require authentication
    if (path.startsWith("/client")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
  ]
}
```

**Status**: [ ] TO DO

---

### ✅ Task 5.2: Update Auth Pages to Use API
**Timp estimat**: 30 min  
**Prioritate**: 🔴 MAXIMĂ

**Modifică**: 
- `app/auth/login/page.tsx` - să facă signIn() real
- `app/auth/register/page.tsx` - să apeleze /api/auth/register
- `app/auth/forgot-password/page.tsx` - să apeleze /api/auth/forgot-password

**Status**: [ ] TO DO

---

## 🔥 FAZA 6: EMAIL SERVICE (2 ore)

### ✅ Task 6.1: Setup Nodemailer
**Timp estimat**: 30 min  
**Prioritate**: 🟡 MEDIE

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

**Creează**: `lib/email.ts`

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Resetare Parolă - Weday",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Resetare Parolă</h1>
        <p>Ai solicitat resetarea parolei pentru contul tău Weday.</p>
        <p>Click pe butonul de mai jos pentru a reseta parola:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #f43f5e, #9333ea); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Resetează Parola
        </a>
        <p style="color: #666; font-size: 14px;">Sau copiază acest link în browser:</p>
        <p style="color: #666; font-size: 14px;">${resetUrl}</p>
        <p style="color: #999; font-size: 12px;">Link-ul expiră în 1 oră.</p>
        <p style="color: #999; font-size: 12px;">Dacă nu ai solicitat resetarea parolei, ignoră acest email.</p>
      </div>
    `,
  })
}

export async function sendRSVPConfirmation(email: string, eventTitle: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Confirmare RSVP - ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Confirmare RSVP</h1>
        <p>Mulțumim pentru confirmarea prezenței la <strong>${eventTitle}</strong>!</p>
        <p>Vom fi încântați să te avem alături de noi.</p>
        <p style="color: #999; font-size: 12px;">Ai primit acest email pentru că ai confirmat prezența la un eveniment Weday.</p>
      </div>
    `,
  })
}
```

**Gmail App Password Setup**:
1. Mergi la https://myaccount.google.com/security
2. Activează "2-Step Verification"
3. Mergi la "App passwords"
4. Generează password pentru "Mail"
5. Folosește-l în .env ca EMAIL_SERVER_PASSWORD

**Status**: [ ] TO DO

---

## 🔥 FAZA 7: FILE UPLOAD (OPȚIONAL - 2-3 ore)

### ✅ Task 7.1: Cloudinary Setup
**Timp estimat**: 1 oră  
**Prioritate**: 🟢 MICĂ

```bash
npm install cloudinary
```

**Adaugă în .env**:
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Status**: [ ] SKIP pentru MVP

---

## 📊 PROGRESS TRACKER

### Overall Progress
- [ ] Faza 1: Setup Inițial (0/4 tasks)
- [ ] Faza 2: Authentication API (0/4 tasks)
- [ ] Faza 3: Events API (0/2 tasks)
- [ ] Faza 4: RSVP & Templates API (0/3 tasks)
- [ ] Faza 5: Middleware (0/2 tasks)
- [ ] Faza 6: Email Service (0/1 tasks)
- [ ] Faza 7: File Upload (0/1 tasks - OPTIONAL)

**Total**: 0/17 tasks completed (0%)

---

## 🎯 MINIMAL VIABLE PRODUCT (MVP)

Pentru ca aplicația să fie funcțională, **MINIMUL necesar**:

### Must Have ✅
1. ✅ Faza 1: Setup (tasks 1.1, 1.2, 1.3)
2. ✅ Faza 2: Task 2.1 (NextAuth)
3. ✅ Faza 2: Task 2.2 (Register)
4. ✅ Faza 3: Tasks 3.1, 3.2 (Events CRUD)
5. ✅ Faza 4: Task 4.1 (RSVP Submit)
6. ✅ Faza 5: Task 5.1 (Middleware)

**Total pentru MVP**: 8 tasks (~8 ore)

### Nice to Have 🟡
- Faza 2: Tasks 2.3, 2.4 (Forgot/Reset Password)
- Faza 4: Tasks 4.2, 4.3 (RSVP List, Templates API)
- Faza 6: Email Service

### Can Wait 🟢
- Faza 7: File Upload

---

## 🚀 QUICK START COMMAND

```bash
# Step 1: Create .env.local
# (copy content from Task 1.2 above)

# Step 2: Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# Step 3: Create API folders
mkdir -p app/api/auth/[...nextauth]
mkdir -p app/api/events
mkdir -p app/api/rsvp
mkdir -p app/api/templates

# Step 4: Start implementing tasks from this TODO list
# Begin with Faza 1, then Faza 2, etc.

# Step 5: Test as you go
npm run dev
```

---

**Următorul pas**: Începe cu Task 1.1 (Database Setup) și lucrează secvențial prin fiecare fază.

Succes! 🚀
