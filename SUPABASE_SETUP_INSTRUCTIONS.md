# 🚀 SETUP DATABASE PRIN SUPABASE SQL EDITOR

Deoarece Prisma nu se poate conecta direct, vom folosi **Supabase SQL Editor** pentru a crea tabelele manual.

---

## 📋 PAȘI (5 minute):

### ✅ PASUL 1: Deschide SQL Editor

Accesează: **https://supabase.com/dashboard/project/jghbzpnqaopttljfdsjh/sql/new**

SAU:
1. Mergi la Supabase Dashboard
2. Click pe **SQL Editor** în meniul din stânga (iconița `</>`)
3. Click pe **"New query"**

---

### ✅ PASUL 2: Creează Tabelele

1. **Deschide fișierul**: `supabase_migration.sql` din VS Code
2. **Selectează TOT** (Ctrl+A)
3. **Copiază** (Ctrl+C)
4. **Paste în SQL Editor** din Supabase
5. **Click pe "RUN"** (butonul verde jos-dreapta)

**Așteptare**: ~5-10 secunde

**Rezultat așteptat**: 
```
✅ Success! Tables created successfully
```

---

### ✅ PASUL 3: Seed Database cu Date Demo

1. **Deschide fișierul**: `supabase_seed.sql` din VS Code
2. **Selectează TOT** (Ctrl+A)
3. **Copiază** (Ctrl+C)
4. **Click pe "New query"** în Supabase (sau golește query-ul anterior)
5. **Paste**
6. **Click pe "RUN"**

**Rezultat așteptat**:
```
✅ SUCCESS! Demo data inserted
Users: 2 (admin, client)
Templates: 5
Events: 3
RSVPs: 10
```

---

### ✅ PASUL 4: Verificare

În Supabase Dashboard, click pe **"Table Editor"** în meniul stânga.

Ar trebui să vezi tabelele:
- ✅ User (2 rows)
- ✅ Template (5 rows)
- ✅ Event (3 rows)
- ✅ RSVP (10 rows)
- ✅ Account
- ✅ Session
- ✅ VerificationToken
- ✅ SiteSettings (1 row)

---

### ✅ PASUL 5: Generează Prisma Client Local

Acum că tabelele există în Supabase, generăm Prisma client local:

```bash
npx prisma generate
```

**Rezultat**: Erorile de import vor dispărea! ✅

---

## 🔑 CONTURI DE TEST

După seed, poți folosi:

**Admin Account:**
- Email: `admin@weday.md`
- Password: `admin123`
- Dashboard: http://localhost:3000/admin/dashboard

**Client Account:**
- Email: `client@weday.md`
- Password: `client123`
- Dashboard: http://localhost:3000/client/dashboard

---

## ❌ DACĂ AI ERORI

### Eroare: "relation already exists"
**Soluție**: Tabelele există deja. Skip PASUL 2, mergi direct la PASUL 3 (seed).

### Eroare: "type already exists"
**Soluție**: ENUM-urile există. Comentează liniile cu `CREATE TYPE` din `supabase_migration.sql` (liniile 8-11).

### Eroare la seed: "duplicate key value"
**Soluție**: Datele există deja. Totul e OK!

---

## ✅ NEXT STEP

După ce rulezi pașii 1-5, spune-mi **"GATA"** și voi continua cu:
- Task 5: Create NextAuth API route
- Task 6: Create Register API
- Task 7-8: Events CRUD API
- Task 9: RSVP API
- Task 10: Middleware

---

**START: Deschide SQL Editor și urmează pașii! 🚀**

https://supabase.com/dashboard/project/jghbzpnqaopttljfdsjh/sql/new
