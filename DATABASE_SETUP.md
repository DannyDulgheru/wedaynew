# 🚀 Setup Database - 2 Opțiuni

## ⚡ Opțiunea 1: SUPABASE (RECOMANDAT - 5 min)

### Pași:

1. **Creează cont gratuit pe Supabase**:
   - Accesează: https://supabase.com
   - Sign up cu GitHub (cel mai rapid)

2. **Creează un proiect nou**:
   - Click "New Project"
   - Name: `weday-platform`
   - Database Password: `[generează unul securizat]`
   - Region: `Europe (Frankfurt)` (cel mai aproape de Moldova)
   - Plan: `Free` (suficient pentru development)
   - Click "Create new project" (durează 2 min)

3. **Copiază Connection String**:
   - În dashboard, mergi la **Settings** → **Database**
   - Scroll la **Connection string** → **URI**
   - Click **Transaction** mode
   - Copiază string-ul (arată ca: `postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres`)

4. **Update `.env` file**:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres?pgbouncer=true"
   ```

5. **Rulează Prisma**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

**✅ GATA! Database-ul este configurat și accesibil din orice loc.**

---

## 🖥️ Opțiunea 2: PostgreSQL LOCAL (15-20 min)

### Instalare:

**Windows - PostgreSQL 16**:

1. **Descarcă installer**:
   - https://www.postgresql.org/download/windows/
   - Sau direct: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Instalează**:
   - Run installer as Administrator
   - Password pentru `postgres` user: `postgres` (sau ce preferi)
   - Port: `5432` (default)
   - Install
   - Bifează "Launch Stack Builder" → NU (skip)

3. **Verifică instalarea**:
   ```powershell
   # Test connection
   psql -U postgres -c "SELECT version();"
   ```

4. **Creează database**:
   ```powershell
   psql -U postgres
   CREATE DATABASE weday_invitations;
   \q
   ```

5. **Update `.env`**:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/weday_invitations?schema=public"
   ```

6. **Rulează Prisma**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

## 🐳 Opțiunea 3: Docker PostgreSQL (dacă ai Docker)

```bash
# Start PostgreSQL container
docker run --name weday-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=weday_invitations -p 5432:5432 -d postgres:16

# Update .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/weday_invitations?schema=public"

# Run Prisma
npx prisma db push
npm run db:seed
```

---

## 🎯 RECOMANDAREA MEA

Pentru **development rapid**, folosește **Supabase** (Opțiunea 1):
- ✅ Gata în 5 minute
- ✅ Gratuit
- ✅ 500MB storage
- ✅ Backup automat
- ✅ Dashboard web
- ✅ Accesibil de oriunde
- ✅ Nu necesită instalare

Pentru **production**, oricum vei folosi Supabase/Neon/Vercel Postgres.

---

**Ce opțiune alegi? (1, 2 sau 3)**
