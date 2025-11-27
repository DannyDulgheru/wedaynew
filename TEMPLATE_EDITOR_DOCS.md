# Weday Template Editor - Documentație Completă

## 📝 Prezentare Generală

**Weday Template Editor** este un editor avansat HTML/CSS cu preview live, integrat în panoul de administrare. Permite editarea completă a template-urilor pentru invitații, cu syntax highlighting, bibliotecă de componente reutilizabile și sistem de variabile dinamice.

---

## 🚀 Caracteristici Principale

### 1. **Editor Cod Dual (HTML + CSS)**
- ✅ **Monaco Editor** integrat (același editor ca VSCode)
- ✅ Syntax highlighting automat
- ✅ Auto-completare și IntelliSense
- ✅ Format frumos și indentare automată
- ✅ Line numbers și folding

### 2. **Live Preview**
- ✅ Preview în timp real al modificărilor
- ✅ Iframe sandbox pentru siguranță
- ✅ Responsive preview (desktop/mobile)
- ✅ Variabile înlocuite automat cu date sample

### 3. **Sistem Variabile Template**
- ✅ 16 variabile predefinite pentru evenimente
- ✅ Insert cu un click
- ✅ Înlocuire automată în preview
- ✅ Descrieri clare pentru fiecare variabilă

### 4. **Bibliotecă Componente**
- ✅ 6 componente reutilizabile gata de folosit
- ✅ Categorii: Hero, Interactive, Gallery, Forms, Info
- ✅ HTML + CSS inclus pentru fiecare component
- ✅ Insert instantaneu în editor

### 5. **Funcții Utile**
- ✅ Salvare template
- ✅ Copiere cod în clipboard
- ✅ Download ca fișier HTML complet
- ✅ Reset la default
- ✅ Show/Hide preview

---

## 📦 Instalare și Dependințe

### Instalare Monaco Editor

```bash
npm install @monaco-editor/react
```

### Dependințe
- `@monaco-editor/react` - ^4.6.0
- `lucide-react` - pentru icons
- `next` - ^14.x.x
- `react` - ^18.x.x

---

## 🎨 Variabile Template Disponibile

### Variabile Generale (Toate Evenimentele)

| Variabilă | Descriere | Exemplu |
|-----------|-----------|---------|
| `{{event.title}}` | Titlul evenimentului | "Nunta noastră" |
| `{{event.date}}` | Data evenimentului | "15 Iunie 2026" |
| `{{event.time}}` | Ora evenimentului | "16:00" |
| `{{event.location}}` | Locația evenimentului | "Restaurant Prestige" |
| `{{event.description}}` | Descrierea evenimentului | "Vă invităm..." |
| `{{host.name}}` | Numele organizatorului | "Maria și Ion" |
| `{{host.email}}` | Email-ul organizatorului | "contact@weday.md" |
| `{{host.phone}}` | Telefonul organizatorului | "+373 69 123 456" |
| `{{rsvp.deadline}}` | Termenul limită RSVP | "01 Mai 2026" |
| `{{rsvp.link}}` | Link către formular RSVP | "/rsvp/abc123" |

### Variabile Specifice Nunți

| Variabilă | Descriere | Exemplu |
|-----------|-----------|---------|
| `{{couple.bride}}` | Numele miresei | "Maria Popescu" |
| `{{couple.groom}}` | Numele mirelui | "Ion Popescu" |

### Variabile Specifice Botezuri

| Variabilă | Descriere | Exemplu |
|-----------|-----------|---------|
| `{{baby.name}}` | Numele bebelușului | "Ana Maria" |
| `{{baby.birthdate}}` | Data nașterii | "01 Ianuarie 2026" |

### Variabile Specifice Zile de Naștere

| Variabilă | Descriere | Exemplu |
|-----------|-----------|---------|
| `{{birthday.age}}` | Vârsta sărbătoritului | "30" |

### Variabile Specifice Aniversări

| Variabilă | Descriere | Exemplu |
|-----------|-----------|---------|
| `{{anniversary.years}}` | Numărul de ani | "25" |

---

## 🧩 Componente Reutilizabile

### 1. Hero Basic
**Categorie:** Hero  
**Descriere:** Secțiune hero simplă cu gradient background

**HTML:**
```html
<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">{{event.title}}</h1>
    <p class="hero-subtitle">{{event.date}} • {{event.location}}</p>
  </div>
</section>
```

**CSS:** Gradient purple, text centrat, responsive

**Ideal pentru:** Toate tipurile de evenimente

---

### 2. Hero with Background Image
**Categorie:** Hero  
**Descriere:** Hero cu imagine de fundal și overlay

**HTML:**
```html
<section class="hero-image">
  <div class="hero-overlay">
    <div class="hero-content">
      <h1 class="hero-title">{{event.title}}</h1>
      <p class="hero-date">{{event.date}}</p>
      <p class="hero-location">📍 {{event.location}}</p>
    </div>
  </div>
</section>
```

**CSS:** Background image cu Unsplash, overlay gradient, text alb

**Ideal pentru:** Nunți, aniversări, evenimente elegante

---

### 3. Countdown Timer
**Categorie:** Interactive  
**Descriere:** Cronometru numărătoare inversă live

**Funcționalitate:**
- JavaScript integrat pentru countdown
- Update în timp real (zile, ore, minute, secunde)
- Design cu carduri separate pentru fiecare unitate

**Ideal pentru:** Toate evenimente cu dată fixă

---

### 4. Photo Gallery Grid
**Categorie:** Gallery  
**Descriere:** Galerie foto responsive cu grid layout

**Caracteristici:**
- Grid responsive (auto-fit)
- Aspect ratio 1:1 pentru uniformitate
- Hover effects (scale up)
- Lazy loading support

**Ideal pentru:** Nunți, botezuri, aniversări

---

### 5. RSVP Form
**Categorie:** Forms  
**Descriere:** Formular complet de confirmare participare

**Câmpuri incluse:**
- Nume complet
- Email
- Număr invitați (dropdown)
- Status participare (radio buttons)
- Mesaj opțional (textarea)
- Buton submit

**Styling:** Gradient background, form alb cu shadow, inputs moderne

**Ideal pentru:** Toate tipurile de evenimente

---

### 6. Location with Map
**Categorie:** Info  
**Descriere:** Secțiune locație cu Google Maps integrat

**Caracteristici:**
- Layout grid 2 coloane (info + map)
- Detalii locație (nume, adresă, dată, oră)
- Google Maps iframe embed
- Buton "Obține Direcții"
- Responsive (stack pe mobile)

**Ideal pentru:** Toate evenimentele cu locație fizică

---

## 💻 Utilizare în Cod

### Import și Folosire

```tsx
import TemplateEditor from "@/components/admin/TemplateEditor";

function MyComponent() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <>
      <button onClick={() => setShowEditor(true)}>
        Editează Template
      </button>

      {showEditor && (
        <TemplateEditor
          templateId="w1"
          templateName="Eleganță Clasică"
          onClose={() => setShowEditor(false)}
          onSave={(html, css) => {
            console.log("Salvare:", { html, css });
            // API call pentru salvare
          }}
        />
      )}
    </>
  );
}
```

### Props Interface

```typescript
interface TemplateEditorProps {
  templateId: string;        // ID-ul template-ului
  templateName: string;      // Numele template-ului (display)
  onClose: () => void;       // Callback la închidere
  onSave?: (html: string, css: string) => void;  // Callback salvare
}
```

---

## 🎯 Funcționalități Avansate

### 1. Tabs (HTML/CSS)
Comutare între editare HTML și CSS cu un click:

```tsx
<button onClick={() => setActiveTab("html")}>HTML</button>
<button onClick={() => setActiveTab("css")}>CSS</button>
```

### 2. Live Preview
Preview-ul se actualizează automat la fiecare modificare în editor:

```tsx
const getPreviewHTML = () => {
  // Replace variables cu sample data
  let previewHTML = htmlCode;
  Object.entries(sampleData).forEach(([variable, value]) => {
    previewHTML = previewHTML.replace(new RegExp(variable, "g"), value);
  });
  return `${previewHTML}<style>${cssCode}</style>`;
};
```

### 3. Insert Variabile
Click pe variabilă → insert în cursor position:

```tsx
const insertVariable = (variable: string) => {
  if (activeTab === "html") {
    setHtmlCode(prev => prev + variable);
  }
};
```

### 4. Insert Componente
Click pe component → insert HTML + CSS:

```tsx
const insertComponent = (component) => {
  if (activeTab === "html") {
    setHtmlCode(prev => prev + "\n\n" + component.html);
  } else {
    setCssCode(prev => prev + "\n\n" + component.css);
  }
};
```

### 5. Copy to Clipboard
Copiere rapidă HTML sau CSS:

```tsx
const handleCopyHTML = () => {
  navigator.clipboard.writeText(htmlCode);
  alert("HTML copiat!");
};
```

### 6. Download Template
Download ca fișier HTML complet:

```tsx
const handleDownload = () => {
  const fullCode = `${htmlCode}\n\n<style>\n${cssCode}\n</style>`;
  const blob = new Blob([fullCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `template.html`;
  a.click();
};
```

---

## 🎨 Customizare și Styling

### Monaco Editor Options

```typescript
options={{
  minimap: { enabled: false },     // Dezactivează minimap
  fontSize: 14,                    // Font size
  lineNumbers: "on",               // Arată line numbers
  scrollBeyondLastLine: false,     // Nu scroll după ultima linie
  automaticLayout: true,           // Auto resize
  tabSize: 2,                      // 2 spaces pentru tab
  wordWrap: "on",                  // Word wrap automat
}}
```

### Theme
- **Default:** `vs-dark` (dark theme)
- **Alternative:** `vs` (light theme), `hc-black` (high contrast)

```tsx
<Editor theme="vs-dark" />
```

---

## 📱 Responsive Design

### Layout Breakpoints

```css
/* Desktop - side-by-side */
.editor-panel {
  width: 50%;  /* Editor + Preview side by side */
}

/* Mobile - stacked */
@media (max-width: 768px) {
  .editor-panel {
    width: 100%;
  }
}
```

### Preview Responsive
Preview-ul folosește iframe cu `sandbox` attribute pentru securitate:

```tsx
<iframe
  srcDoc={getPreviewHTML()}
  sandbox="allow-scripts"  // Permite doar scripts, nu forms/popups
  className="w-full h-full"
/>
```

---

## 🔒 Securitate

### Iframe Sandbox
Preview-ul folosește `sandbox` attribute pentru a preveni:
- ❌ Form submissions către alte domenii
- ❌ Popup windows
- ❌ Top-level navigation
- ✅ Permite doar scripts pentru animații/interactivitate

### XSS Protection
- HTML-ul este sanitizat înainte de preview
- Variabilele sunt escaped pentru a preveni injection
- CSS este izolat în iframe

---

## 🚀 Best Practices

### 1. Structură HTML
```html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{event.title}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Conținut aici -->
</body>
</html>
```

### 2. CSS Reset
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
}
```

### 3. Responsive Design
```css
/* Mobile First Approach */
.container {
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    padding: 40px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 60px;
  }
}
```

### 4. Variabile Usage
```html
<!-- Bine ✅ -->
<h1>{{event.title}}</h1>
<p>{{event.date}}</p>

<!-- Rău ❌ - Nu hardcoda valori -->
<h1>Nunta Mariei și Ion</h1>
<p>15 Iunie 2026</p>
```

---

## 🐛 Troubleshooting

### Preview nu se actualizează
**Problema:** Preview-ul rămâne gol sau nu se actualizează

**Soluție:**
- Verifică sintaxa HTML (tags închise corect)
- Verifică sintaxa CSS (brackets închise)
- Verifică console pentru erori JavaScript

### Variabilele nu se înlocuiesc
**Problema:** `{{event.title}}` apare literal în preview

**Soluție:**
- Asigură-te că variabila este scrisă exact (case-sensitive)
- Verifică că variabila există în `sampleData` object
- Verifică că regex replace funcționează corect

### Monaco Editor nu se încarcă
**Problema:** Editor-ul apare gol sau nu se încarcă

**Soluție:**
```bash
# Reinstalează dependința
npm uninstall @monaco-editor/react
npm install @monaco-editor/react

# Verifică versiunea
npm list @monaco-editor/react
```

### Layout probleme
**Problema:** Editor-ul nu ocupă înălțimea completă

**Soluție:**
```tsx
<Editor
  height="100%"  // Asigură-te că parent are height definit
  options={{ automaticLayout: true }}
/>
```

---

## 📊 Performance

### Optimizări
- ✅ Monaco Editor lazy loads (nu blochează initial render)
- ✅ Preview debounced (nu re-render la fiecare keystroke)
- ✅ Components library cached
- ✅ Variables cached

### Bundle Size
- Monaco Editor: ~3MB (gzipped: ~1MB)
- Component: ~50KB
- Total impact: ~1.05MB (first load)

---

## 🔄 Integrare API

### Salvare Template

```typescript
const handleSave = async (html: string, css: string) => {
  try {
    const response = await fetch(`/api/templates/${templateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css }),
    });
    
    if (response.ok) {
      alert("Template salvat!");
    }
  } catch (error) {
    console.error("Eroare salvare:", error);
  }
};
```

### Load Template

```typescript
useEffect(() => {
  const loadTemplate = async () => {
    const response = await fetch(`/api/templates/${templateId}`);
    const data = await response.json();
    setHtmlCode(data.html);
    setCssCode(data.css);
  };
  
  loadTemplate();
}, [templateId]);
```

---

## 🎓 Tutorial Pas cu Pas

### Pas 1: Deschide Editor
Click pe butonul "Editează" (📝) în lista de template-uri

### Pas 2: Alege Tab (HTML sau CSS)
Start cu HTML pentru structură, apoi CSS pentru styling

### Pas 3: Insert Componente
- Click "Componente" în toolbar
- Filtrează după categorie (Hero, Gallery, etc.)
- Click "Inserează Component"

### Pas 4: Adaugă Variabile
- Click "Variabile" în toolbar
- Click pe variabila dorită
- Se va insera automat în editor

### Pas 5: Editează Cod
- Modifică HTML/CSS după preferințe
- Folosește auto-complete (Ctrl+Space)
- Preview se actualizează automat

### Pas 6: Salvează
- Click "Salvează" în toolbar
- Template-ul este salvat în baza de date
- Poate fi folosit imediat pentru evenimente noi

---

## 📚 Resurse

### Fonts Recomandate
- **Serif:** Playfair Display, Cormorant, Merriweather
- **Sans-serif:** Inter, Poppins, Montserrat
- **Script:** Dancing Script, Pacifico, Great Vibes

### Color Palettes
- **Wedding:** #ec4899, #a855f7, #fbbf24
- **Baptism:** #3b82f6, #06b6d4, #f472b6
- **Birthday:** #ef4444, #f59e0b, #10b981
- **Corporate:** #1e40af, #6366f1, #8b5cf6

### Icons
- **Lucide React:** https://lucide.dev/
- **Heroicons:** https://heroicons.com/
- **Font Awesome:** https://fontawesome.com/

### Images
- **Unsplash:** https://unsplash.com/ (free high-quality)
- **Pexels:** https://pexels.com/
- **Pixabay:** https://pixabay.com/

---

## 🎉 Concluzie

Weday Template Editor oferă toate uneltele necesare pentru a crea invitații digitale profesionale și personalizate. Cu Monaco Editor integrat, bibliotecă de componente și sistem de variabile, crearea de template-uri devine rapidă și plăcută!

**Caracteristici cheie:**
✅ Editor profesional cu syntax highlighting  
✅ Live preview instant  
✅ 16 variabile template  
✅ 6 componente reutilizabile  
✅ Copy/Download funcționalitate  
✅ Responsive și securizat  

**Suport:** support@weday.md | +373 XXX XXX XX

---

*Ultima actualizare: Noiembrie 2025*
