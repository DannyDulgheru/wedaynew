"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Cake,
  Baby,
  Calendar,
  Briefcase,
  X,
  Check,
  Sparkles,
  Image as ImageIcon,
  Type,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Gift,
  Shirt,
  Home,
  ArrowRight,
} from "lucide-react";

const templates = [
  // Wedding Templates (4)
  {
    id: 1,
    name: "Romantic Rose",
    type: "WEDDING",
    icon: Heart,
    color: "rose",
    image: "bg-gradient-to-br from-rose-200 to-pink-300",
    description: "Design elegant cu motive florale și detalii romantice",
    features: ["Hero cu poză cuplu", "Secțiune poveste de dragoste", "Galerie foto interactivă", "Program nuntă", "Harta locație", "Formular RSVP", "Listă cadouri", "Dress code"],
    mockup: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
  },
  {
    id: 2,
    name: "Golden Elegance",
    type: "WEDDING",
    icon: Heart,
    color: "amber",
    image: "bg-gradient-to-br from-amber-200 to-yellow-300",
    description: "Luxos și sofisticat cu accente aurii",
    features: ["Header video background", "Cronometru numărătoare inversă", "Galerie carousel", "Schedule detaliat", "Secțiune ospitalitate", "RSVP cu opțiuni meniu", "Registry links", "FAQ interactive"],
    mockup: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop",
  },
  {
    id: 3,
    name: "Lavender Dreams",
    type: "WEDDING",
    icon: Heart,
    color: "purple",
    image: "bg-gradient-to-br from-purple-200 to-indigo-300",
    description: "Romantic și delicat cu nuanțe de lavandă",
    features: ["Hero animat", "Timeline poveste", "Galerie grid masonry", "Program ilustrat", "Hartă interactivă", "RSVP cu +1", "Wish list", "Cod vestimentar"],
    mockup: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop",
  },
  {
    id: 4,
    name: "Sunset Love",
    type: "WEDDING",
    icon: Heart,
    color: "orange",
    image: "bg-gradient-to-br from-orange-200 to-red-300",
    description: "Cald și vibrant cu tonuri de apus",
    features: ["Video hero", "Story timeline", "Galerie fullscreen", "Program cu iconițe", "Locație cu poze", "RSVP avansat", "Gift registry", "Info transport"],
    mockup: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1200&fit=crop",
  },
  // Baptism Templates (4)
  {
    id: 5,
    name: "Little Angel",
    type: "BAPTISM",
    icon: Baby,
    color: "blue",
    image: "bg-gradient-to-br from-blue-200 to-cyan-300",
    description: "Perfect pentru botez cu motive angelice",
    features: ["Hero cu poză bebeluș", "Info despre copil", "Galerie momentele special", "Detalii ceremonie", "Hartă biserică/restaurant", "Formular RSVP", "Secțiune nași", "Meniu petrecere"],
    mockup: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=1200&fit=crop",
  },
  {
    id: 6,
    name: "Heaven Blessed",
    type: "BAPTISM",
    icon: Baby,
    color: "sky",
    image: "bg-gradient-to-br from-sky-200 to-blue-300",
    description: "Plin de bucurie și binecuvântare",
    features: ["Header video", "Milestone timeline", "Galerie Instagram-style", "Program detaliat", "Locații multiple", "RSVP cu opțiuni copii", "Info nași", "Dress code sugestat"],
    mockup: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=1200&fit=crop",
  },
  {
    id: 7,
    name: "Sweet Dreams",
    type: "BAPTISM",
    icon: Baby,
    color: "pink",
    image: "bg-gradient-to-br from-pink-200 to-rose-300",
    description: "Delicat și adorabil în roz pastel",
    features: ["Hero animat", "Prima lună timeline", "Galerie carousel", "Detalii ceremonie ilustrate", "Harta interactivă", "RSVP simplificat", "Secțiune părinți", "Info petrecere"],
    mockup: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1200&fit=crop",
  },
  {
    id: 8,
    name: "Cloud Nine",
    type: "BAPTISM",
    icon: Baby,
    color: "indigo",
    image: "bg-gradient-to-br from-indigo-200 to-purple-300",
    description: "Ceresc și blând cu nori decorativi",
    features: ["Hero cu slideshow", "Cronologie creștere", "Galerie masonry", "Program cu timing", "Locații cu preview", "RSVP cu dietary needs", "Despre nași", "Transport info"],
    mockup: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&h=1200&fit=crop",
  },
  // Birthday Templates (4)
  {
    id: 9,
    name: "Party Time",
    type: "BIRTHDAY",
    icon: Cake,
    color: "pink",
    image: "bg-gradient-to-br from-pink-300 to-purple-400",
    description: "Vesel și colorat pentru petreceri memorabile",
    features: ["Hero festiv", "Countdown la party", "Galerie highlight-uri anul trecut", "Program activități", "Locație venue", "RSVP quick", "Lista cadouri", "Info dress code"],
    mockup: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1200&fit=crop",
  },
  {
    id: 10,
    name: "Confetti Fun",
    type: "BIRTHDAY",
    icon: Cake,
    color: "rainbow",
    image: "bg-gradient-to-br from-red-300 via-yellow-300 to-green-300",
    description: "Plin de energie și confetti animate",
    features: ["Video hero background", "Age timeline", "Galerie grid", "Schedule cu jocuri", "Venue map", "RSVP cu +kids", "Gift ideas", "Parking info"],
    mockup: "https://images.unsplash.com/photo-1464347744102-11db6282f854?w=800&h=1200&fit=crop",
  },
  {
    id: 11,
    name: "Balloon Fiesta",
    type: "BIRTHDAY",
    icon: Cake,
    color: "teal",
    image: "bg-gradient-to-br from-teal-300 to-cyan-400",
    description: "Jucăuș și distractiv cu baloane",
    features: ["Animated hero", "Birthday timeline", "Photo carousel", "Activities program", "Interactive map", "RSVP form", "Wish list", "Theme details"],
    mockup: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=1200&fit=crop",
  },
  {
    id: 12,
    name: "Sweet Celebration",
    type: "BIRTHDAY",
    icon: Cake,
    color: "fuchsia",
    image: "bg-gradient-to-br from-fuchsia-300 to-pink-400",
    description: "Dulce și festiv pentru zile speciale",
    features: ["Hero cu slideshow", "Memory lane", "Galerie masonry", "Party schedule", "Venue details", "RSVP advanced", "Registry", "FAQ section"],
    mockup: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=1200&fit=crop",
  },
  // Anniversary Templates (4)
  {
    id: 13,
    name: "Golden Years",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "amber",
    image: "bg-gradient-to-br from-amber-300 to-orange-400",
    description: "Elegant și memorabil pentru aniversări de aur",
    features: ["Hero cu poză cuplu", "Timeline relație", "Galerie de-a lungul anilor", "Program eveniment", "Locație celebrare", "RSVP", "Mesaje invitați", "Info cazare"],
    mockup: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=1200&fit=crop",
  },
  {
    id: 14,
    name: "Ruby Love",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "red",
    image: "bg-gradient-to-br from-red-300 to-rose-400",
    description: "Pasional și intens pentru aniversări ruby",
    features: ["Video background hero", "Love story timeline", "Photo gallery carousel", "Celebration schedule", "Venue map", "RSVP with meal choice", "Guest messages", "Accommodation"],
    mockup: "https://images.unsplash.com/photo-1522673607198-f04e8dc7d13c?w=800&h=1200&fit=crop",
  },
  {
    id: 15,
    name: "Silver Moments",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "slate",
    image: "bg-gradient-to-br from-slate-300 to-gray-400",
    description: "Rafinat și clasic pentru aniversări de argint",
    features: ["Elegant hero", "Journey timeline", "Grid photo gallery", "Event program", "Location details", "RSVP form", "Guestbook", "Travel info"],
    mockup: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop",
  },
  {
    id: 16,
    name: "Pearl Memories",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "cyan",
    image: "bg-gradient-to-br from-cyan-300 to-teal-400",
    description: "Prețios și unic pentru momente speciale",
    features: ["Slideshow hero", "Milestone timeline", "Masonry gallery", "Detailed schedule", "Interactive venue map", "Advanced RSVP", "Message wall", "Hotel recommendations"],
    mockup: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b3?w=800&h=1200&fit=crop",
  },
  // Corporate Templates (4)
  {
    id: 17,
    name: "Business Conference",
    type: "CORPORATE",
    icon: Briefcase,
    color: "blue",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
    description: "Profesional pentru conferințe business",
    features: ["Hero cu logo companie", "Agenda conference", "Speaker profiles", "Session schedule", "Venue & logistics", "Registration form", "Sponsor showcase", "Networking area"],
    mockup: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop",
  },
  {
    id: 18,
    name: "Team Building",
    type: "CORPORATE",
    icon: Briefcase,
    color: "green",
    image: "bg-gradient-to-br from-green-500 to-emerald-600",
    description: "Energizant pentru activități de team building",
    features: ["Dynamic hero", "Event overview", "Activities schedule", "Team challenges", "Location map", "RSVP attendance", "Photo gallery", "Safety guidelines"],
    mockup: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1200&fit=crop",
  },
  {
    id: 19,
    name: "Product Launch",
    type: "CORPORATE",
    icon: Briefcase,
    color: "purple",
    image: "bg-gradient-to-br from-purple-600 to-violet-700",
    description: "Impact maxim pentru lansări de produse",
    features: ["Video hero product", "Launch timeline", "Product features showcase", "Event schedule", "Venue details", "Registration", "Media kit", "Press contacts"],
    mockup: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200&fit=crop",
  },
  {
    id: 20,
    name: "Annual Gala",
    type: "CORPORATE",
    icon: Briefcase,
    color: "rose",
    image: "bg-gradient-to-br from-rose-600 to-red-700",
    description: "Elegant pentru gale și evenimente corporate de lux",
    features: ["Luxury hero design", "Event highlights", "Guest speakers", "Program & timeline", "Venue showcase", "Ticket registration", "Sponsor gallery", "Dress code & etiquette"],
    mockup: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=1200&fit=crop",
  },
];

const categories = [
  { id: "ALL", name: "Toate", icon: Heart },
  { id: "WEDDING", name: "Nuntă", icon: Heart },
  { id: "BAPTISM", name: "Botez", icon: Baby },
  { id: "BIRTHDAY", name: "Zi de Naștere", icon: Cake },
  { id: "ANNIVERSARY", name: "Aniversare", icon: Calendar },
  { id: "CORPORATE", name: "Corporativ", icon: Briefcase },
];

interface Template {
  id: number;
  name: string;
  type: string;
  icon: any;
  color: string;
  image: string;
  description: string;
  features: string[];
  mockup: string;
}

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const filteredTemplates =
    activeCategory === "ALL"
      ? templates
      : templates.filter((t) => t.type === activeCategory);

  const openPreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const closePreview = () => {
    setShowPreviewModal(false);
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  return (
    <section id="templates" className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            <span className="text-gray-800">Galerie</span>{" "}
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Template-uri
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            16 template-uri profesionale pentru fiecare tip de eveniment
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Template Preview */}
                <div className={`h-64 ${template.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <button
                      onClick={() => openPreview(template)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-all"
                    >
                      Preview Live
                    </button>
                  </div>
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                    <Icon className="h-5 w-5 text-rose-500" />
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>
                  <button
                    onClick={() => openPreview(template)}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Vezi Detalii
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Fiecare template poate fi complet personalizat după preferințele tale
          </p>
          <a
            href="/auth/register"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            <span>Începe să Creezi</span>
          </a>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={closePreview}
        />
      )}
    </section>
  );
}

// Template Preview Modal Component
interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
}

function TemplatePreviewModal({ template, onClose }: TemplatePreviewModalProps) {
  const Icon = template.icon;

  const customizationOptions = [
    "Schimbarea culorilor și fonturilor",
    "Încărcare imagini și logo personalizat",
    "Editare texte și descrieri",
    "Adăugare/ștergere secțiuni",
    "Reordonare secțiuni prin drag-and-drop",
    "Personalizare formular RSVP",
    "Integrare Google Maps",
    "Muzică de fundal (opțional)",
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all flex items-center justify-center group"
          >
            <X className="h-6 w-6 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* Header with Preview */}
          <div className="relative">
            <div className={`h-80 ${template.image} relative overflow-hidden`}>
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold font-playfair">{template.name}</h2>
                      <p className="text-lg opacity-90">{template.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Sections */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Check className="h-6 w-6 text-green-500" />
                    Funcționalități Incluse
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {template.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup Preview */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ImageIcon className="h-6 w-6 text-blue-500" />
                    Preview Design
                  </h3>
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <img 
                      src={template.mockup} 
                      alt={`${template.name} preview`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                    Opțiuni de Personalizare
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {customizationOptions.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-0 space-y-6">
                  {/* Price Card */}
                  <div className="bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="text-center mb-4">
                      <div className="text-sm opacity-90 mb-2">Preț fix</div>
                      <div className="text-5xl font-bold mb-2">999</div>
                      <div className="text-lg opacity-90">MDL</div>
                    </div>
                    <div className="border-t border-white/20 pt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Hosting inclus 1 an</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Domeniu personalizat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>RSVP nelimitat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Suport 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Actualizări nelimitate</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/auth/register"
                    className="block w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Alege Template - 999 MDL</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    <p className="font-semibold mb-2">💡 Știai că?</p>
                    <p>
                      După achiziție, vei avea acces imediat la editor și vei putea
                      personaliza template-ul în doar câteva minute!
                    </p>
                  </div>

                  {/* Trust Badges */}
                  <div className="text-center text-sm text-gray-600 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Plată securizată</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Garanție satisfacție 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
