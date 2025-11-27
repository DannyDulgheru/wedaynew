# 🚀 GitHub Upload Guide - Weday Project

Acest ghid te va ajuta să încarci proiectul Weday pe GitHub pas cu pas.

---

## ✅ Pregătire Completă

Înainte de a încărca pe GitHub, verifică că ai toate fișierele necesare:

- ✅ **README.md** - Documentație completă și profesională
- ✅ **.env.example** - Template pentru variabile de mediu
- ✅ **LICENSE** - MIT License
- ✅ **.gitignore** - Configurare corectă (exclude node_modules, .env, .next, etc.)
- ✅ **STATUS_REPORT.md** - Raport detaliat despre status proiect
- ✅ **TODO_BACKEND.md** - Roadmap pentru implementare backend

---

## 📋 Opțiune 1: Upload Manual prin GitHub Web Interface

### Pasul 1: Creează Repository pe GitHub
1. Accesează [github.com](https://github.com) și loghează-te
2. Click pe **"+"** în colțul dreapta-sus → **"New repository"**
3. Completează:
   - **Repository name**: `weday-copilot`
   - **Description**: "🎉 Platformă all-in-one pentru gestionarea invitațiilor la evenimente - Wedding, Corporate, Birthday & more"
   - **Visibility**: Public (sau Private)
   - ❌ **NU** bifa "Initialize with README" (ai deja README.md)
   - ❌ **NU** adăuga .gitignore sau LICENSE (le ai deja)
4. Click **"Create repository"**

### Pasul 2: Inițializează Git Local (PowerShell)
```powershell
# Navighează în folder-ul proiectului
cd C:\Users\conta\Documents\Codes\weday-copilot

# Inițializează Git repository
git init

# Adaugă toate fișierele (respectă .gitignore)
git add .

# Creează primul commit
git commit -m "Initial commit: Weday platform - Frontend complete (100%)"
```

### Pasul 3: Conectează la GitHub și Push
```powershell
# Adaugă remote repository (ÎNLOCUIEȘTE cu URL-ul tău!)
git remote add origin https://github.com/YOUR-USERNAME/weday-copilot.git

# Verifică branch-ul curent
git branch

# Redenumește branch-ul în 'main' (dacă este 'master')
git branch -M main

# Push la GitHub
git push -u origin main
```

---

## 📋 Opțiune 2: Upload cu GitHub CLI (gh)

### Instalare GitHub CLI (dacă nu ai)
```powershell
# Instalează cu winget
winget install --id GitHub.cli

# SAU descarcă de pe https://cli.github.com/
```

### Upload complet cu un singur command
```powershell
# Navighează în folder-ul proiectului
cd C:\Users\conta\Documents\Codes\weday-copilot

# Inițializează Git
git init

# Add și commit
git add .
git commit -m "Initial commit: Weday platform - Frontend complete (100%)"

# Crează repository pe GitHub și push automat
gh repo create weday-copilot --public --source=. --remote=origin --push

# SAU pentru repository privat:
gh repo create weday-copilot --private --source=. --remote=origin --push
```

---

## 🎨 Opțiune 3: Upload cu GitHub Desktop

### Instalare GitHub Desktop
1. Descarcă de pe [desktop.github.com](https://desktop.github.com/)
2. Instalează și loghează-te cu contul GitHub

### Upload prin GitHub Desktop
1. **File** → **Add Local Repository** → Selectează folder-ul `weday-copilot`
2. Dacă Git nu este inițializat, click **"Create Repository"**
3. În panoul din stânga, verifică fișierele adăugate (respectă .gitignore)
4. Scrie commit message: `"Initial commit: Weday platform - Frontend complete (100%)"`
5. Click **"Commit to main"**
6. Click **"Publish repository"** în toolbar
7. Setează:
   - Name: `weday-copilot`
   - Description: `"🎉 Platformă all-in-one pentru invitații la evenimente"`
   - Keep code private: ☐ (pentru public) sau ☑ (pentru private)
8. Click **"Publish Repository"**

---

## ✨ Post-Upload: Configurare Repository GitHub

### 1. Adaugă Topics/Tags
Accesează repository-ul pe GitHub → Click **⚙️ Settings** (în dreapta) → Scroll la **"Topics"**

**Tags recomandate:**
```
nextjs, typescript, tailwind-css, prisma, postgresql, 
nextauth, event-management, invitation-platform, 
react, monaco-editor, drag-and-drop, rsvp
```

### 2. Editează Description
În pagina principală a repository-ului, click **"⚙️"** lângă "About" și adaugă:

```
🎉 Platformă all-in-one pentru gestionarea invitațiilor la evenimente - Wedding, Corporate, Birthday & more. Built cu Next.js, TypeScript, Tailwind CSS & Prisma.
```

**Website**: `https://weday-copilot.vercel.app` (sau URL-ul tău)

### 3. Creează GitHub Pages (Opțional - pentru documentație)
1. **Settings** → **Pages**
2. Source: Deploy from branch → `main` → `/docs`
3. Save

### 4. Adaugă Shields/Badges (Opțional)
Badges-urile sunt deja în README.md:
- Next.js 16.0
- TypeScript 5.0
- Tailwind CSS 4.0
- Prisma 7.0
- MIT License

---

## 🔒 Verificări de Securitate

### ⚠️ IMPORTANT: Verifică că aceste fișiere NU sunt pe GitHub

```powershell
# Verifică dacă .env.local este exclus
git check-ignore .env.local
# Trebuie să returneze: .env.local

# Verifică dacă node_modules este exclus
git check-ignore node_modules/
# Trebuie să returneze: node_modules/
```

### Fișiere care TREBUIE să fie ignorate (în .gitignore):
- ❌ `.env.local` - Variabile de mediu cu secrete
- ❌ `.env` - Variabile de mediu
- ❌ `node_modules/` - Dependencies
- ❌ `.next/` - Build output
- ❌ `*.pem` - Certificate private

### Fișiere care TREBUIE să fie pe GitHub:
- ✅ `.env.example` - Template (fără valori reale)
- ✅ `README.md` - Documentație
- ✅ `LICENSE` - Licență
- ✅ `.gitignore` - Configurare Git
- ✅ `package.json` - Dependencies list
- ✅ Toate fișierele de cod sursă

---

## 🚨 Troubleshooting

### Eroare: "remote origin already exists"
```powershell
# Șterge remote-ul existent
git remote remove origin

# Adaugă din nou cu URL-ul corect
git remote add origin https://github.com/YOUR-USERNAME/weday-copilot.git
```

### Eroare: "! [rejected] main -> main (fetch first)"
```powershell
# Pull modificările de pe GitHub
git pull origin main --allow-unrelated-histories

# Apoi push
git push -u origin main
```

### Eroare: "Authentication failed"
**PowerShell/CMD:**
```powershell
# Folosește GitHub Personal Access Token
# Crează token: https://github.com/settings/tokens
# Permissions: repo (Full control)

# La prompt pentru password, folosește token-ul (nu parola)
```

**SAU** folosește GitHub CLI:
```powershell
gh auth login
```

### Repository deja există pe GitHub
```powershell
# Șterge repository-ul vechi pe GitHub (Settings → Danger Zone → Delete)
# SAU folosește un nume diferit:
gh repo create weday-copilot-v2 --public --source=. --remote=origin --push
```

---

## 📊 Next Steps După Upload

### 1. Deploy pe Vercel
```bash
# Instalează Vercel CLI
npm i -g vercel

# Deploy
vercel

# Urmează instrucțiunile (link cu GitHub account)
```

### 2. Setup Database (Production)
- **Vercel Postgres**: [vercel.com/docs/storage/vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)
- **Supabase**: [supabase.com](https://supabase.com)
- **Neon**: [neon.tech](https://neon.tech)

### 3. Configurează Environment Variables pe Vercel
În Vercel Dashboard:
1. **Settings** → **Environment Variables**
2. Adaugă toate variabilele din `.env.example`
3. Redeploy aplicația

### 4. Implementează Backend
Urmează pașii din **TODO_BACKEND.md**:
- Setup PostgreSQL & Prisma
- Creează API routes
- Configurează authentication
- Testează endpoints

---

## 📞 Support

Dacă întâmpini probleme:
1. Verifică [GitHub Docs](https://docs.github.com)
2. Caută eroarea pe [Stack Overflow](https://stackoverflow.com)
3. Deschide un issue în repository

---

## ✅ Checklist Final

Înainte de a considera upload-ul complet, verifică:

- [ ] Repository creat pe GitHub
- [ ] Cod pushed pe branch `main`
- [ ] README.md arată corect pe GitHub
- [ ] Topics/Tags adăugate
- [ ] Description setată
- [ ] `.env.local` NU este pe GitHub (verificat)
- [ ] `node_modules/` NU este pe GitHub (verificat)
- [ ] LICENSE file vizibil
- [ ] `.env.example` prezent
- [ ] Toate documentele (STATUS_REPORT.md, TODO_BACKEND.md) sunt uploadate
- [ ] (Opțional) Deploy pe Vercel configurat
- [ ] (Opțional) Database production setup

---

**Succes cu upload-ul! 🚀**

Pentru întrebări sau probleme, deschide un issue pe GitHub.
