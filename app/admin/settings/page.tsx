"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  Heart,
  Save,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  Search as SearchIcon,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Upload,
  Plus,
  Edit,
  Code,
  Palette,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type SettingsTab = "general" | "seo" | "landing" | "email" | "social" | "branding";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Weday",
    siteUrl: "https://Weday.md",
    supportEmail: "support@Weday.md",
    contactPhone: "+373 60 123 456",
    address: "Chișinău, Moldova",
    packagePrice: 999,
    currency: "MDL",
  });

  const [features, setFeatures] = useState({
    allowRegistration: true,
    requireEmailVerification: true,
    enableSmsNotifications: false,
    maintenanceMode: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@Weday.md",
    smtpPassword: "••••••••",
  });

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Weday - Invitații Digitale Elegante | Moldova",
    metaDescription:
      "Creează invitații digitale interactive pentru nunți, botezuri, zile de naștere și evenimente corporate. Personalizare completă, RSVP automat, 999 MDL.",
    metaKeywords:
      "invitații digitale, invitații online, nuntă, botez, zi de naștere, RSVP, Moldova",
    ogTitle: "Weday - Invitații Digitale Moldova",
    ogDescription: "Creează invitații digitale elegante în doar 10 minute",
    ogImage: "/og-image.jpg",
    structuredData: true,
    sitemapEnabled: true,
  });

  // Landing Page Content
  const [landingContent, setLandingContent] = useState({
    heroTitle: "Invitații Digitale vs Tradiționale",
    heroSubtitle: "Creează invitații interactive în doar 10 minute",
    heroCTA: "Începe Gratuit",
    featuresTitle: "De ce Weday?",
    testimonialsTitle: "Ce spun clienții noștri",
    pricingTitle: "Prețuri Simple",
    faqTitle: "Întrebări Frecvente",
  });

  // Email Templates
  const [emailTemplates] = useState([
    {
      id: "1",
      name: "Email Bun Venit",
      subject: "Bine ai venit la Weday! 🎉",
      type: "welcome",
    },
    {
      id: "2",
      name: "Confirmare RSVP",
      subject: "Confirmarea ta RSVP pentru {{event.title}}",
      type: "rsvp_confirmation",
    },
    {
      id: "3",
      name: "Resetare Parolă",
      subject: "Resetează-ți parola Weday",
      type: "password_reset",
    },
  ]);

  // Social Media
  const [socialMedia, setSocialMedia] = useState({
    facebook: "https://facebook.com/weday.md",
    instagram: "https://instagram.com/weday.md",
    twitter: "https://twitter.com/weday_md",
    linkedin: "https://linkedin.com/company/weday",
    youtube: "https://youtube.com/@weday",
  });

  // Branding
  const [branding, setBranding] = useState({
    primaryColor: "#ec4899",
    secondaryColor: "#a855f7",
    accentColor: "#f97316",
    font: "Inter, sans-serif",
    headingFont: "Playfair Display, serif",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save general settings API call
    alert("Setări generale salvate cu succes!");
  };

  const handleSaveFeatures = () => {
    // TODO: Implement save features API call
    alert("Setări funcționalități salvate cu succes!");
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save email settings API call
    alert("Setări email salvate cu succes!");
  };

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Setări SEO</h3>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Meta Title *
        </label>
        <input
          type="text"
          value={seoSettings.metaTitle}
          onChange={(e) =>
            setSeoSettings({ ...seoSettings, metaTitle: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          maxLength={60}
        />
        <p className="text-sm text-gray-500 mt-1">
          {seoSettings.metaTitle.length}/60 caractere
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Meta Description *
        </label>
        <textarea
          value={seoSettings.metaDescription}
          onChange={(e) =>
            setSeoSettings({
              ...seoSettings,
              metaDescription: e.target.value,
            })
          }
          rows={3}
          maxLength={160}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
        />
        <p className="text-sm text-gray-500 mt-1">
          {seoSettings.metaDescription.length}/160 caractere
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Meta Keywords
        </label>
        <input
          type="text"
          value={seoSettings.metaKeywords}
          onChange={(e) =>
            setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            OG Title
          </label>
          <input
            type="text"
            value={seoSettings.ogTitle}
            onChange={(e) =>
              setSeoSettings({ ...seoSettings, ogTitle: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            OG Image URL
          </label>
          <input
            type="text"
            value={seoSettings.ogImage}
            onChange={(e) =>
              setSeoSettings({ ...seoSettings, ogImage: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <div className="font-semibold text-gray-800">
            Activează Structured Data
          </div>
          <div className="text-sm text-gray-600">Schema.org markup pentru SEO</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={seoSettings.structuredData}
            onChange={(e) =>
              setSeoSettings({
                ...seoSettings,
                structuredData: e.target.checked,
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
        </label>
      </div>
    </div>
  );

  const renderLandingPageContent = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-rose-500" />
          <h4 className="font-bold text-gray-800">Secțiunea Hero</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titlu Principal
            </label>
            <input
              type="text"
              value={landingContent.heroTitle}
              onChange={(e) =>
                setLandingContent({
                  ...landingContent,
                  heroTitle: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitlu
            </label>
            <input
              type="text"
              value={landingContent.heroSubtitle}
              onChange={(e) =>
                setLandingContent({
                  ...landingContent,
                  heroSubtitle: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titlu Secțiune Features
          </label>
          <input
            type="text"
            value={landingContent.featuresTitle}
            onChange={(e) =>
              setLandingContent({
                ...landingContent,
                featuresTitle: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titlu Secțiune Testimoniale
          </label>
          <input
            type="text"
            value={landingContent.testimonialsTitle}
            onChange={(e) =>
              setLandingContent({
                ...landingContent,
                testimonialsTitle: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderEmailTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Template-uri Email</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
          <Plus className="h-5 w-5" />
          <span>Adaugă Template</span>
        </button>
      </div>

      <div className="grid gap-4">
        {emailTemplates.map((template) => (
          <div
            key={template.id}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-rose-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-rose-500" />
                  <h4 className="font-bold text-gray-800">{template.name}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {template.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Code className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <div className="font-semibold text-blue-900 mb-1">
              Variabile Disponibile
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <div>
                <code className="bg-blue-100 px-2 py-0.5 rounded">
                  {"{{user.name}}"}
                </code>{" "}
                - Numele utilizatorului
              </div>
              <div>
                <code className="bg-blue-100 px-2 py-0.5 rounded">
                  {"{{event.title}}"}
                </code>{" "}
                - Titlul evenimentului
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Linkuri Social Media
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Facebook
          </label>
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
            <input
              type="url"
              value={socialMedia.facebook}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Instagram
          </label>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-600" />
            <input
              type="url"
              value={socialMedia.instagram}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, instagram: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LinkedIn
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-700" />
            <input
              type="url"
              value={socialMedia.linkedin}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedin: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranding = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-rose-500" />
          <h4 className="font-bold text-gray-800">Paletă Culori</h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Culoare Primară
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, primaryColor: e.target.value })
                }
                className="h-12 w-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={branding.primaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, primaryColor: e.target.value })
                }
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Culoare Secundară
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, secondaryColor: e.target.value })
                }
                className="h-12 w-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={branding.secondaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, secondaryColor: e.target.value })
                }
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Culoare Accent
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={branding.accentColor}
                onChange={(e) =>
                  setBranding({ ...branding, accentColor: e.target.value })
                }
                className="h-12 w-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={branding.accentColor}
                onChange={(e) =>
                  setBranding({ ...branding, accentColor: e.target.value })
                }
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-bold text-gray-800 mb-4">Fonturi</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Font Principal
            </label>
            <select
              value={branding.font}
              onChange={(e) =>
                setBranding({ ...branding, font: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Font Titluri
            </label>
            <select
              value={branding.headingFont}
              onChange={(e) =>
                setBranding({ ...branding, headingFont: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            >
              <option value="Playfair Display, serif">Playfair Display</option>
              <option value="Merriweather, serif">Merriweather</option>
              <option value="Lora, serif">Lora</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
              <span className="text-xl font-bold font-playfair bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Weday
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Utilizatori</span>
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Evenimente</span>
            </Link>
            <Link
              href="/admin/templates"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ImageIcon className="h-5 w-5" />
              <span>Template-uri</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <Settings className="h-5 w-5" />
              <span className="font-semibold">Setări Site</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Deconectare</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Setări Site
          </h1>
          <p className="text-gray-600">
            Configurează setările generale ale platformei
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "general"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General
            </span>
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "seo"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              SEO
            </span>
          </button>
          <button
            onClick={() => setActiveTab("landing")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "landing"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Landing Page
            </span>
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "email"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Templates
            </span>
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "social"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Facebook className="h-5 w-5" />
              Social Media
            </span>
          </button>
          <button
            onClick={() => setActiveTab("branding")}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "branding"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Branding
            </span>
          </button>
        </div>

        {activeTab === "general" && (
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-6 w-6 text-rose-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Informații Generale
              </h2>
            </div>

            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nume Site
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Site
                  </label>
                  <input
                    type="url"
                    value={generalSettings.siteUrl}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4" />
                    <span>Email Support</span>
                  </label>
                  <input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4" />
                    <span>Telefon Contact</span>
                  </label>
                  <input
                    type="tel"
                    value={generalSettings.contactPhone}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>Adresă</span>
                  </label>
                  <input
                    type="text"
                    value={generalSettings.address}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Preț Pachet</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={generalSettings.packagePrice}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, packagePrice: parseInt(e.target.value) })
                      }
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      required
                    />
                    <select
                      value={generalSettings.currency}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, currency: e.target.value })
                      }
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    >
                      <option value="MDL">MDL</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvează Modificările</span>
                </button>
              </div>
            </form>
          </div>

          {/* Feature Toggles */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-6 w-6 text-rose-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Funcționalități
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">
                    Înregistrare Nouă
                  </div>
                  <div className="text-sm text-gray-600">
                    Permite utilizatorilor noi să se înregistreze
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.allowRegistration}
                    onChange={(e) =>
                      setFeatures({
                        ...features,
                        allowRegistration: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">
                    Verificare Email
                  </div>
                  <div className="text-sm text-gray-600">
                    Cere utilizatorilor să verifice adresa de email
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.requireEmailVerification}
                    onChange={(e) =>
                      setFeatures({
                        ...features,
                        requireEmailVerification: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">
                    Notificări SMS
                  </div>
                  <div className="text-sm text-gray-600">
                    Activează notificările prin SMS
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.enableSmsNotifications}
                    onChange={(e) =>
                      setFeatures({
                        ...features,
                        enableSmsNotifications: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div>
                  <div className="font-semibold text-red-800">
                    Mod Mentenanță
                  </div>
                  <div className="text-sm text-red-600">
                    Dezactivează accesul public la site
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={features.maintenanceMode}
                    onChange={(e) =>
                      setFeatures({
                        ...features,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSaveFeatures}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvează Preferințele</span>
                </button>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="h-6 w-6 text-rose-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Setări Email (SMTP)
              </h2>
            </div>

            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SMTP User
                  </label>
                  <input
                    type="email"
                    value={emailSettings.smtpUser}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={emailSettings.smtpPassword}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="h-5 w-5" />
                  <span>Salvează Setările Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        )}

        {activeTab === "seo" && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            {renderSEOSettings()}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handleSaveGeneral}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Save className="h-5 w-5" />
                <span>Salvează Setările</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "landing" && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            {renderLandingPageContent()}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handleSaveGeneral}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Save className="h-5 w-5" />
                <span>Salvează Setările</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            {renderEmailTemplates()}
          </div>
        )}

        {activeTab === "social" && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            {renderSocialMedia()}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handleSaveGeneral}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Save className="h-5 w-5" />
                <span>Salvează Setările</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            {renderBranding()}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <button
                onClick={handleSaveGeneral}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Save className="h-5 w-5" />
                <span>Salvează Setările</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
