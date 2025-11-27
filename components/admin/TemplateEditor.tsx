"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Code,
  Eye,
  Save,
  X,
  RefreshCw,
  Copy,
  Download,
  Sparkles,
  Type,
  Image as ImageIcon,
  Palette,
  Layout,
  Layers,
} from "lucide-react";

interface TemplateEditorProps {
  templateId: string;
  templateName: string;
  onClose: () => void;
  onSave?: (html: string, css: string) => void;
}

// Template variables that can be used
const templateVariables = [
  { var: "{{event.title}}", description: "Titlul evenimentului" },
  { var: "{{event.date}}", description: "Data evenimentului (DD/MM/YYYY)" },
  { var: "{{event.time}}", description: "Ora evenimentului (HH:MM)" },
  { var: "{{event.location}}", description: "Locația evenimentului" },
  { var: "{{event.description}}", description: "Descrierea evenimentului" },
  { var: "{{host.name}}", description: "Numele gazdei/organizatorului" },
  { var: "{{host.email}}", description: "Email-ul gazdei" },
  { var: "{{host.phone}}", description: "Telefonul gazdei" },
  { var: "{{couple.bride}}", description: "Numele miresei (pentru nunți)" },
  { var: "{{couple.groom}}", description: "Numele mirelui (pentru nunți)" },
  { var: "{{baby.name}}", description: "Numele bebelușului (pentru botezuri)" },
  { var: "{{baby.birthdate}}", description: "Data nașterii bebelușului" },
  { var: "{{birthday.age}}", description: "Vârsta sărbătoritului" },
  { var: "{{anniversary.years}}", description: "Numărul de ani împreună" },
  { var: "{{rsvp.deadline}}", description: "Termenul limită RSVP" },
  { var: "{{rsvp.link}}", description: "Link către formularul RSVP" },
];

// Reusable components library
const componentLibrary = [
  {
    id: "hero-basic",
    name: "Hero Basic",
    category: "Hero",
    html: `<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">{{event.title}}</h1>
    <p class="hero-subtitle">{{event.date}} • {{event.location}}</p>
  </div>
</section>`,
    css: `.hero-section {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 60px 20px;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}`,
  },
  {
    id: "hero-image",
    name: "Hero with Background Image",
    category: "Hero",
    html: `<section class="hero-image">
  <div class="hero-overlay">
    <div class="hero-content">
      <h1 class="hero-title">{{event.title}}</h1>
      <p class="hero-date">{{event.date}}</p>
      <p class="hero-location">📍 {{event.location}}</p>
    </div>
  </div>
</section>`,
    css: `.hero-image {
  min-height: 600px;
  background-image: url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920');
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  color: white;
  padding: 40px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-date {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.hero-location {
  font-size: 1.3rem;
  opacity: 0.95;
}`,
  },
  {
    id: "countdown",
    name: "Countdown Timer",
    category: "Interactive",
    html: `<section class="countdown-section">
  <h2 class="section-title">Până la marele eveniment</h2>
  <div class="countdown">
    <div class="countdown-item">
      <span class="countdown-number" id="days">--</span>
      <span class="countdown-label">Zile</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="hours">--</span>
      <span class="countdown-label">Ore</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="minutes">--</span>
      <span class="countdown-label">Min</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="seconds">--</span>
      <span class="countdown-label">Sec</span>
    </div>
  </div>
</section>

<script>
// Countdown logic (use {{event.date}} for target date)
const targetDate = new Date('{{event.date}}').getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  document.getElementById('days').textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById('hours').textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById('minutes').textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('seconds').textContent = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);
</script>`,
    css: `.countdown-section {
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
  font-family: 'Playfair Display', serif;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  min-width: 120px;
}

.countdown-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
  margin-bottom: 10px;
}

.countdown-label {
  font-size: 1rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}`,
  },
  {
    id: "gallery-grid",
    name: "Photo Gallery Grid",
    category: "Gallery",
    html: `<section class="gallery-section">
  <h2 class="section-title">Galerie Foto</h2>
  <div class="gallery-grid">
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600" alt="Photo 1">
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600" alt="Photo 2">
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600" alt="Photo 3">
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600" alt="Photo 4">
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600" alt="Photo 5">
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600" alt="Photo 6">
    </div>
  </div>
</section>`,
    css: `.gallery-section {
  padding: 80px 20px;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  font-family: 'Playfair Display', serif;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
  },
  {
    id: "rsvp-form",
    name: "RSVP Form",
    category: "Forms",
    html: `<section class="rsvp-section">
  <h2 class="section-title">Confirmă Participarea</h2>
  <form class="rsvp-form">
    <div class="form-group">
      <label for="name">Nume Complet</label>
      <input type="text" id="name" placeholder="Ion Popescu" required>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="ion@example.com" required>
    </div>
    <div class="form-group">
      <label for="guests">Număr Invitați</label>
      <select id="guests">
        <option value="1">1 persoană</option>
        <option value="2">2 persoane</option>
        <option value="3">3 persoane</option>
        <option value="4">4 persoane</option>
        <option value="5">5+ persoane</option>
      </select>
    </div>
    <div class="form-group">
      <label for="status">Voi participa?</label>
      <div class="radio-group">
        <label><input type="radio" name="status" value="yes" checked> Da, voi fi prezent</label>
        <label><input type="radio" name="status" value="no"> Nu pot participa</label>
      </div>
    </div>
    <div class="form-group">
      <label for="message">Mesaj (opțional)</label>
      <textarea id="message" rows="4" placeholder="Felicitări și urări..."></textarea>
    </div>
    <button type="submit" class="submit-btn">Trimite Confirmarea</button>
  </form>
</section>`,
    css: `.rsvp-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: white;
  font-family: 'Playfair Display', serif;
}

.rsvp-form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: normal;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}`,
  },
  {
    id: "location-map",
    name: "Location with Map",
    category: "Info",
    html: `<section class="location-section">
  <h2 class="section-title">Locația Evenimentului</h2>
  <div class="location-content">
    <div class="location-info">
      <h3 class="location-name">{{event.location}}</h3>
      <p class="location-address">Strada Exemplu nr. 123, Chișinău</p>
      <div class="location-details">
        <div class="detail-item">
          <span class="detail-icon">📅</span>
          <span>{{event.date}}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">🕐</span>
          <span>{{event.time}}</span>
        </div>
        <div class="detail-item">
          <span class="detail-icon">📍</span>
          <span>Google Maps</span>
        </div>
      </div>
      <a href="#" class="directions-btn">Obține Direcții</a>
    </div>
    <div class="location-map">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.892!2d28.8356!3d47.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzM3LjgiTiAyOMKwNTAnMDguMiJF!5e0!3m2!1sen!2s!4v1234567890"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy">
      </iframe>
    </div>
  </div>
</section>`,
    css: `.location-section {
  padding: 80px 20px;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  font-family: 'Playfair Display', serif;
}

.location-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.location-info {
  padding: 40px;
}

.location-name {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
}

.location-address {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.location-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
  color: #555;
}

.detail-icon {
  font-size: 1.5rem;
}

.directions-btn {
  display: inline-block;
  padding: 15px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: transform 0.2s;
}

.directions-btn:hover {
  transform: translateY(-2px);
}

.location-map {
  height: 450px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .location-content {
    grid-template-columns: 1fr;
  }
}`,
  },
];

export default function TemplateEditor({
  templateId,
  templateName,
  onClose,
  onSave,
}: TemplateEditorProps) {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [activeTab, setActiveTab] = useState<"html" | "css">("html");
  const [showPreview, setShowPreview] = useState(true);
  const [showVariables, setShowVariables] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Initialize with default template
  useEffect(() => {
    const defaultHTML = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{event.title}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">{{event.title}}</h1>
      <p class="hero-subtitle">{{event.date}} • {{event.location}}</p>
      <p class="hero-description">{{event.description}}</p>
    </div>
  </section>

  <!-- Content Section -->
  <section class="content">
    <div class="container">
      <h2 class="section-title">Te așteptăm cu drag!</h2>
      <p class="section-text">
        Vă invităm să fiți alături de noi în această zi specială.
      </p>
    </div>
  </section>
</body>
</html>`;

    const defaultCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.2rem;
  opacity: 0.85;
}

.content {
  padding: 80px 20px;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Playfair Display', serif;
}

.section-text {
  font-size: 1.2rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}`;

    setHtmlCode(defaultHTML);
    setCssCode(defaultCSS);
  }, []);

  const handleSave = () => {
    if (onSave) {
      onSave(htmlCode, cssCode);
    }
    alert("Template salvat cu succes!");
  };

  const handleReset = () => {
    if (confirm("Sigur vrei să resetezi template-ul? Toate modificările vor fi pierdute.")) {
      // Reset to default
      setHtmlCode("");
      setCssCode("");
    }
  };

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(htmlCode);
    alert("HTML copiat în clipboard!");
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    alert("CSS copiat în clipboard!");
  };

  const handleDownload = () => {
    const fullCode = `${htmlCode}\n\n<style>\n${cssCode}\n</style>`;
    const blob = new Blob([fullCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const insertComponent = (component: typeof componentLibrary[0]) => {
    if (activeTab === "html") {
      setHtmlCode(prev => prev + "\n\n" + component.html);
    } else {
      setCssCode(prev => prev + "\n\n" + component.css);
    }
    setShowComponents(false);
  };

  const insertVariable = (variable: string) => {
    if (activeTab === "html") {
      setHtmlCode(prev => prev + variable);
    }
  };

  const getPreviewHTML = () => {
    // Replace variables with sample data for preview
    let previewHTML = htmlCode;
    const sampleData = {
      "{{event.title}}": "Nunta noastră",
      "{{event.date}}": "15 Iunie 2026",
      "{{event.time}}": "16:00",
      "{{event.location}}": "Restaurant Prestige, Chișinău",
      "{{event.description}}": "Vă invităm să fiți alături de noi în cea mai frumoasă zi din viața noastră",
      "{{host.name}}": "Maria și Ion",
      "{{host.email}}": "contact@weday.md",
      "{{host.phone}}": "+373 69 123 456",
      "{{couple.bride}}": "Maria Popescu",
      "{{couple.groom}}": "Ion Popescu",
      "{{baby.name}}": "Ana Maria",
      "{{baby.birthdate}}": "01 Ianuarie 2026",
      "{{birthday.age}}": "30",
      "{{anniversary.years}}": "25",
      "{{rsvp.deadline}}": "01 Mai 2026",
      "{{rsvp.link}}": "#rsvp",
    };

    Object.entries(sampleData).forEach(([variable, value]) => {
      previewHTML = previewHTML.replace(new RegExp(variable, "g"), value);
    });

    return `
      ${previewHTML}
      <style>${cssCode}</style>
    `;
  };

  const categories = ["all", "Hero", "Interactive", "Gallery", "Forms", "Info"];
  const filteredComponents =
    selectedCategory === "all"
      ? componentLibrary
      : componentLibrary.filter((c) => c.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-4 bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Code className="h-6 w-6 text-purple-600" />
              Editor Template: {templateName}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Editează HTML și CSS, apoi previzualizează rezultatul live
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVariables(!showVariables)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Variabile
            </button>
            <button
              onClick={() => setShowComponents(!showComponents)}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2"
            >
              <Layers className="h-4 w-4" />
              Componente
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Ascunde" : "Arată"} Preview
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Salvează
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel */}
          <div className={`${showPreview ? "w-1/2" : "w-full"} flex flex-col border-r border-gray-200`}>
            {/* Tabs */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setActiveTab("html")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === "html"
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab("css")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === "css"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                CSS
              </button>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={activeTab === "html" ? handleCopyHTML : handleCopyCSS}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Copiază cod"
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Descarcă template"
                >
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Resetează"
                >
                  <RefreshCw className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={activeTab === "html" ? "html" : "css"}
                value={activeTab === "html" ? htmlCode : cssCode}
                onChange={(value) =>
                  activeTab === "html"
                    ? setHtmlCode(value || "")
                    : setCssCode(value || "")
                }
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="w-1/2 flex flex-col bg-gray-50">
              <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  Live Preview
                </h3>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    srcDoc={getPreviewHTML()}
                    className="w-full h-full min-h-[600px]"
                    title="Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Variables Sidebar */}
        {showVariables && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-gray-200 shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Variabile Template
                </h3>
                <button
                  onClick={() => setShowVariables(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600">
                Click pe o variabilă pentru a o insera în cod
              </p>
            </div>
            <div className="p-4 space-y-2">
              {templateVariables.map((item, index) => (
                <button
                  key={index}
                  onClick={() => insertVariable(item.var)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                >
                  <code className="text-sm font-mono text-purple-600 group-hover:text-purple-700">
                    {item.var}
                  </code>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Components Library Sidebar */}
        {showComponents && (
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white border-l border-gray-200 shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-600" />
                  Bibliotecă Componente
                </h3>
                <button
                  onClick={() => setShowComponents(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-1 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat === "all" ? "Toate" : cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 space-y-3">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{component.name}</h4>
                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded mt-1 inline-block">
                        {component.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => insertComponent(component)}
                    className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:shadow-lg transition-all"
                  >
                    Inserează Component
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
