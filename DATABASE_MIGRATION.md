# Migrare la SQLite Database

## ✅ Ce s-a schimbat

### 1. Database Provider
- **Înainte:** PostgreSQL (Supabase)
- **Acum:** SQLite (local)

### 2. Schema Prisma
Schema a fost adaptată pentru SQLite:

- **Enums → Strings:**
  - `UserRole` → `String` ("ADMIN" | "CLIENT")
  - `EventType` → `String` ("WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE")
  - `OrderStatus` → `String` ("PENDING" | "PAID" | "ACTIVE" | "EXPIRED")
  - `RSVPStatus` → `String` ("ATTENDING" | "NOT_ATTENDING" | "MAYBE")

- **JSON → String:**
  - Toate câmpurile `Json` au devenit `String`
  - Datele JSON sunt stocate ca stringuri și trebuie parsate cu `JSON.parse()` / `JSON.stringify()`

### 3. Database File
- Fișier: `prisma/dev.db`
- Locație: local în proiect
- **IMPORTANT:** `dev.db` este în `.gitignore` - nu se va urca pe GitHub

## 🔑 Credențiale Test

### Admin
- **Email:** admin@Weday.md
- **Password:** admin123
- **Role:** ADMIN

### Client
- **Email:** client@Weday.md
- **Password:** client123
- **Role:** CLIENT

## 📝 Comenzi Utile

### Resetează baza de date
```bash
# Șterge fișierul database
Remove-Item prisma\dev.db -Force

# Recreează schema
npx prisma db push

# Repopulează cu date
npx tsx prisma/seed.ts
```

### Vizualizare bază de date
```bash
npx prisma studio
```

### Generează client Prisma
```bash
npx prisma generate
```

## ⚠️ Limitări SQLite

1. **Nu suportă enum-uri native** - folosim validare la nivel de aplicație
2. **Nu suportă JSON nativ** - stocăm ca stringuri
3. **Concurență limitată** - OK pentru development, nu pentru producție
4. **Fișier local** - nu poate fi partajat între developeri

## 🔄 Revenire la Supabase

Dacă vrei să revii la Supabase:

1. **Repornește proiectul Supabase:**
   - https://supabase.com/dashboard/project/jghbzpnqaopttljfdsjh
   - Click "Resume Project"

2. **Modifică `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Reconvertește tipurile:**
   - `String` role → `enum UserRole`
   - `String` eventType → `enum EventType`
   - `String` JSON fields → `Json`

4. **Push schema:**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## 📊 Status Actual

- ✅ Database SQLite creat
- ✅ Schema migrata
- ✅ Useri de test creați
- ✅ NextAuth funcționează
- ✅ Server pornește corect
- ⚠️ Templates temporar dezactivate (vor fi adăugate ulterior)

## 🚀 Next Steps

1. Testează login-ul la http://localhost:3000/auth/login
2. Verifică că redirect-ul funcționează
3. Testează funcționalitățile aplicației
4. Când Supabase este disponibil, migrează înapoi la PostgreSQL
