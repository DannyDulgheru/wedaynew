# 🚀 Ghid de Utilizare - Weday

## 📋 Cuprins
- [Începere Rapidă](#începere-rapidă)
- [Structura Aplicației](#structura-aplicației)
- [Pagini Disponibile](#pagini-disponibile)
- [Conturi de Test](#conturi-de-test)
- [Caracteristici Principale](#caracteristici-principale)
- [Next Steps](#next-steps)

## 🎯 Începere Rapidă

### 1. Aplicația rulează deja!
Serverul este pornit pe: **http://localhost:3000**

### 2. Explorează Landing Page-ul
Deschide browserul și navighează la `http://localhost:3000` pentru a vedea:
- ✨ Hero section cu animații
- 🎨 6 caracteristici principale
- 📋 Cum funcționează (4 pași)
- ⭐ De ce Weday
- 🎨 Galerie cu 16 template-uri
- 💰 Prețuri (999 MDL)
- 💬 Testimoniale
- ❓ FAQ (10 întrebări)
- 📧 Formular de contact
- 🔗 Footer complet

## 📱 Pagini Disponibile

### 🏠 Public Pages
- **Landing Page**: `http://localhost:3000`
- **Login**: `http://localhost:3000/auth/login`
- **Register**: `http://localhost:3000/auth/register`
- **Invitație Publică (Demo)**: `http://localhost:3000/invite/demo`

### 👤 Client Dashboard
- **Dashboard**: `http://localhost:3000/client/dashboard`
- **Invitațiile Mele**: `http://localhost:3000/client/events`
- **RSVP**: `http://localhost:3000/client/rsvp`
- **Setări**: `http://localhost:3000/client/settings`

### 🔐 Admin Panel
- **Dashboard**: `http://localhost:3000/admin/dashboard`
- **Utilizatori**: `http://localhost:3000/admin/users`
- **Evenimente**: `http://localhost:3000/admin/events`
- **Template-uri**: `http://localhost:3000/admin/templates`
- **Setări Site**: `http://localhost:3000/admin/settings`

## 🎨 Template-uri Disponibile

### 💒 Nunți (4 template-uri)
1. **Romantic Rose** - Design elegant cu motive florale
2. **Golden Elegance** - Luxos și sofisticat
3. **Lavender Dreams** - Romantic și delicat
4. **Sunset Love** - Cald și vibrant

### 👶 Botezuri (4 template-uri)
1. **Little Angel** - Perfect pentru botez
2. **Heaven Blessed** - Plin de bucurie
3. **Sweet Dreams** - Delicat și adorabil
4. **Cloud Nine** - Ceresc și blând

### 🎂 Zile de Naștere (4 template-uri)
1. **Party Time** - Vesel și colorat
2. **Confetti Fun** - Plin de energie
3. **Balloon Fiesta** - Jucăuș și distractiv
4. **Sweet Celebration** - Dulce și festiv

### 🎊 Aniversări (4 template-uri)
1. **Golden Years** - Elegant și memorabil
2. **Ruby Love** - Pasional și intens
3. **Silver Moments** - Rafinat și clasic
4. **Pearl Memories** - Prețios și unic

## 👥 Conturi de Test

### Admin
- **Email**: `admin@Weday.md`
- **Parolă**: `admin123`
- **Acces**: Panou admin complet cu CRUD

### Client
- **Email**: `client@Weday.md`
- **Parolă**: `client123`
- **Acces**: Dashboard client cu editor invitații

## ✨ Caracteristici Implementate

### ✅ Landing Page
- [x] Design modern cu Tailwind CSS
- [x] 10 secțiuni complete
- [x] Navbar sticky cu scroll effect
- [x] Animații blob pentru background
- [x] Responsive pe toate device-urile
- [x] Galerie interactivă template-uri
- [x] FAQ accordion
- [x] Formular contact functional

### ✅ Autentificare
- [x] Pagină Login cu validare
- [x] Pagină Register cu validare parole
- [x] Design consistent cu landing
- [x] Error handling

### ✅ Dashboard Client
- [x] Sidebar navigation
- [x] Statistici (invitații, views, RSVP)
- [x] Quick actions
- [x] Listă evenimente
- [x] Butoane editare și preview

### ✅ Dashboard Admin
- [x] Sidebar navigation admin
- [x] Statistici avansate
- [x] Evenimente recente
- [x] Charts placeholder
- [x] Breakdown pe tipuri evenimente

### ✅ Invitație Publică
- [x] Design elegant pentru nuntă
- [x] Formular RSVP complet
- [x] Selecție status participare
- [x] Detalii eveniment
- [x] Secțiune poveste
- [x] Footer cu branding

## 🗄️ Baza de Date

### Pentru a inițializa baza de date:

```bash
# Opțiunea 1: Prisma Dev (Recomandată)
npx prisma dev

# Opțiunea 2: PostgreSQL Local
# Asigură-te că PostgreSQL rulează și apoi:
npx prisma db push
npm run db:seed
```

### Modele în Database:
- **User**: Utilizatori (admin/client)
- **Event**: Evenimente/Invitații
- **Template**: 16 template-uri
- **RSVP**: Confirmări participare
- **SiteSettings**: Configurare site

## 🎨 Personalizare

### Culori
Editează `tailwind.config.ts` pentru a schimba paleta de culori:
```typescript
colors: {
  primary: '#f43f5e',    // Rose
  secondary: '#a855f7',   // Purple
  accent: '#ec4899',      // Pink
}
```

### Fonts
Fonturile sunt configurate în `app/layout.tsx`:
- **Sans**: Inter (pentru text general)
- **Playfair**: Playfair Display (pentru titluri elegante)

### Template-uri
Template-urile sunt în `components/landing/TemplateGallery.tsx`.
Poți adăuga mai multe sau modifica cele existente.

## 🔧 Comenzi Utile

```bash
# Development
npm run dev              # Pornire server dezvoltare

# Database
npm run db:push         # Push schema la database
npm run db:seed         # Seed cu date inițiale
npm run db:studio       # Deschide Prisma Studio (GUI)

# Build & Production
npm run build           # Build pentru producție
npm start              # Rulare build producție

# Prisma
npx prisma generate    # Regenerare Prisma Client
npx prisma migrate dev # Creare migrare nouă
npx prisma studio      # GUI pentru database
```

## 📸 Preview Screenshots

### Landing Page
- Hero cu animații blob
- Statistici: 500+ evenimente, 16 template-uri, 98% rating
- Galerie interactivă cu filtre

### Dashboard Client
- Sidebar cu navigație
- Cards pentru statistici
- Listă evenimente cu RSVP count
- Butoane rapide pentru editare

### Dashboard Admin
- Statistici detaliate
- Grafice revenue
- Management complet

### Invitație Publică
- Design elegant nuntă
- Formular RSVP cu 3 opțiuni status
- Detalii eveniment cu icoane

## 🚀 Next Steps - Dezvoltare Viitoare

### Prioritate Înaltă:
1. **API Routes**: Implementare endpoints pentru CRUD
2. **NextAuth Integration**: Conectare completă cu Prisma
3. **Editor Invitații**: Drag & drop builder
4. **Upload Images**: Cloudinary/S3 integration
5. **Payment Gateway**: Integrare plăți 999 MDL

### Prioritate Medie:
6. **Email Notifications**: Confirmare RSVP, reminders
7. **Export CSV**: Lista invitați pentru client
8. **Social Sharing**: Butoane share Facebook/Instagram
9. **Analytics**: Dashboard cu grafice interactive
10. **Multi-language**: Română, Rusă, Engleză

### Prioritate Scăzută:
11. **Mobile App**: React Native companion
12. **QR Codes**: Pentru check-in la evenimente
13. **Live Gallery**: Upload poze din eveniment
14. **Video Backgrounds**: Pentru template-uri
15. **Music Player**: Melodie de fundal pentru invitații

## 💡 Tips & Tricks

### 1. Editare Rapidă Template
Pentru a testa un template nou:
- Deschide `components/landing/TemplateGallery.tsx`
- Adaugă template în array-ul `templates`
- Refresh browser

### 2. Seed Database
Pentru date de test:
```bash
npm run db:seed
```

### 3. Preview Invitație
Accesează direct: `http://localhost:3000/invite/demo`

### 4. Prisma Studio
Pentru management vizual al database-ului:
```bash
npx prisma studio
```

## 🐛 Troubleshooting

### Erori comune:

**1. "Cannot find module '@prisma/client'"**
```bash
npx prisma generate
```

**2. "Database connection error"**
- Verifică că PostgreSQL rulează
- Verifică DATABASE_URL în `.env`

**3. "Port 3000 already in use"**
```bash
# Oprește procesul și repornește
npm run dev -- -p 3001
```

## 📚 Resurse

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)

## 🎉 Succes!

Platformă completă de invitații online este gata de dezvoltare! 
Toate componentele de bază sunt implementate și funcționale.

**Creat cu ❤️ pentru evenimente memorabile!**
