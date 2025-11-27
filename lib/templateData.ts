import { Heart, Cake, Baby, Calendar, Briefcase, LucideIcon } from "lucide-react";

export interface TemplateData {
  id: number;
  name: string;
  type: EventType;
  icon: LucideIcon;
  color: string;
  image: string;
  description: string;
  features: string[];
  mockup: string;
  sections: TemplateSection[];
  customization: CustomizationOption[];
}

export type EventType = "WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  isOptional: boolean;
  isDefault: boolean;
}

export interface CustomizationOption {
  category: string;
  options: string[];
}

// Comprehensive template sections
const weddingSections: TemplateSection[] = [
  { id: "hero", name: "Hero Section", description: "Poză cuplu cu nume și dată", isOptional: false, isDefault: true },
  { id: "countdown", name: "Countdown Timer", description: "Numărătoare inversă până la nuntă", isOptional: true, isDefault: true },
  { id: "story", name: "Love Story", description: "Povestea voastră de dragoste", isOptional: true, isDefault: true },
  { id: "gallery", name: "Galerie Foto", description: "Colecție imagini cuplu", isOptional: false, isDefault: true },
  { id: "schedule", name: "Program Nuntă", description: "Timeline eveniment (cununia civilă, religioasă, petrecere)", isOptional: false, isDefault: true },
  { id: "location", name: "Locație", description: "Hartă și adresă sală/biserică", isOptional: false, isDefault: true },
  { id: "rsvp", name: "Formular RSVP", description: "Confirmare participare cu opțiuni meniu", isOptional: false, isDefault: true },
  { id: "registry", name: "Listă Cadouri", description: "Gift registry sau cont bancar", isOptional: true, isDefault: false },
  { id: "dresscode", name: "Dress Code", description: "Cod vestimentar și indicații", isOptional: true, isDefault: true },
  { id: "accommodations", name: "Cazare", description: "Recomandări hoteluri pentru invitați", isOptional: true, isDefault: false },
  { id: "faq", name: "FAQ", description: "Întrebări frecvente", isOptional: true, isDefault: false },
];

const baptismSections: TemplateSection[] = [
  { id: "hero", name: "Hero Section", description: "Poză bebeluș cu nume și dată", isOptional: false, isDefault: true },
  { id: "about-baby", name: "Despre Bebeluș", description: "Info copil (data nașterii, greutate, etc)", isOptional: true, isDefault: true },
  { id: "parents", name: "Părinți", description: "Info despre părinți", isOptional: true, isDefault: false },
  { id: "godparents", name: "Nași", description: "Info despre nași", isOptional: true, isDefault: true },
  { id: "gallery", name: "Galerie Foto", description: "Fotografii bebeluș", isOptional: false, isDefault: true },
  { id: "ceremony", name: "Ceremonie", description: "Detalii biserică și ora botezului", isOptional: false, isDefault: true },
  { id: "party", name: "Petrecere", description: "Detalii restaurant/locație", isOptional: false, isDefault: true },
  { id: "location", name: "Locație", description: "Hartă cu biserica și restaurant", isOptional: false, isDefault: true },
  { id: "rsvp", name: "Formular RSVP", description: "Confirmare participare", isOptional: false, isDefault: true },
  { id: "dresscode", name: "Dress Code", description: "Sugestii vestimentație", isOptional: true, isDefault: false },
];

const birthdaySections: TemplateSection[] = [
  { id: "hero", name: "Hero Section", description: "Poză sărbătorit cu vârstă", isOptional: false, isDefault: true },
  { id: "countdown", name: "Countdown", description: "Numărătoare până la party", isOptional: true, isDefault: true },
  { id: "timeline", name: "Timeline", description: "Momente importante din viață", isOptional: true, isDefault: false },
  { id: "gallery", name: "Galerie Foto", description: "Fotografii de-a lungul anilor", isOptional: true, isDefault: true },
  { id: "schedule", name: "Program Party", description: "Activități și program petrecere", isOptional: false, isDefault: true },
  { id: "location", name: "Locație", description: "Hartă și adresă venue", isOptional: false, isDefault: true },
  { id: "rsvp", name: "Formular RSVP", description: "Confirmare participare", isOptional: false, isDefault: true },
  { id: "gifts", name: "Lista Cadouri", description: "Sugestii cadouri sau surprize", isOptional: true, isDefault: false },
  { id: "theme", name: "Temă Party", description: "Detalii despre temă și dress code", isOptional: true, isDefault: false },
  { id: "games", name: "Jocuri", description: "Activități și jocuri planificate", isOptional: true, isDefault: false },
];

const anniversarySections: TemplateSection[] = [
  { id: "hero", name: "Hero Section", description: "Poză cuplu cu ani împreună", isOptional: false, isDefault: true },
  { id: "journey", name: "Călătoria Noastră", description: "Timeline relație", isOptional: true, isDefault: true },
  { id: "gallery", name: "Galerie Foto", description: "Fotografii de-a lungul anilor", isOptional: false, isDefault: true },
  { id: "memories", name: "Amintiri", description: "Momente speciale și povești", isOptional: true, isDefault: false },
  { id: "celebration", name: "Celebrare", description: "Detalii eveniment aniversare", isOptional: false, isDefault: true },
  { id: "location", name: "Locație", description: "Hartă și adresă", isOptional: false, isDefault: true },
  { id: "rsvp", name: "Formular RSVP", description: "Confirmare participare", isOptional: false, isDefault: true },
  { id: "guestbook", name: "Carte Oaspeți", description: "Mesaje de la invitați", isOptional: true, isDefault: true },
  { id: "accommodations", name: "Cazare", description: "Info hoteluri pentru invitați", isOptional: true, isDefault: false },
];

const corporateSections: TemplateSection[] = [
  { id: "hero", name: "Hero Section", description: "Banner cu logo companie și eveniment", isOptional: false, isDefault: true },
  { id: "overview", name: "Overview", description: "Descriere eveniment", isOptional: false, isDefault: true },
  { id: "agenda", name: "Agendă", description: "Program detaliat sesiuni", isOptional: false, isDefault: true },
  { id: "speakers", name: "Speakeri", description: "Profilele speakerilor", isOptional: true, isDefault: true },
  { id: "sponsors", name: "Sponsori", description: "Logo-uri și info sponsori", isOptional: true, isDefault: false },
  { id: "venue", name: "Venue", description: "Detalii locație cu planuri", isOptional: false, isDefault: true },
  { id: "registration", name: "Înregistrare", description: "Formular participare/ticketing", isOptional: false, isDefault: true },
  { id: "networking", name: "Networking", description: "Oportunități networking", isOptional: true, isDefault: false },
  { id: "logistics", name: "Logistică", description: "Transport, parking, cazare", isOptional: true, isDefault: true },
  { id: "media", name: "Media Kit", description: "Resurse pentru presă", isOptional: true, isDefault: false },
];

// Customization options by category
const weddingCustomization: CustomizationOption[] = [
  { 
    category: "Design", 
    options: ["Scheme culori tematice (rose, gold, lavender)", "Font-uri elegante (Playfair, Cormorant)", "Layout-uri responsive", "Animații subtile"] 
  },
  { 
    category: "Conținut", 
    options: ["Upload imagini cuplu (max 50)", "Video background", "Poveste de dragoste personalizată", "Mesaje pentru invitați"] 
  },
  { 
    category: "Funcționalitate", 
    options: ["RSVP cu tracking", "Opțiuni meniu (vegetarian, vegan, etc)", "Guest list management", "Confirmare automată email/SMS"] 
  },
  { 
    category: "Interactivitate", 
    options: ["Countdown timer live", "Galerie colaborativă (invitați uploadează poze)", "Muzică background", "Mesaje text live"] 
  },
];

const baptismCustomization: CustomizationOption[] = [
  { 
    category: "Design", 
    options: ["Culori pastel (blue, pink, cream)", "Motive îngerașe/nori", "Fonts delicate", "Layouts child-friendly"] 
  },
  { 
    category: "Conținut", 
    options: ["Fotografii bebeluș (max 30)", "Info bebeluș (greutate, lungime)", "Milestone photos", "Mesaje părinți/nași"] 
  },
  { 
    category: "Funcționalitate", 
    options: ["RSVP simplificat", "Tracking confirmări", "Info dietetice (pentru copii)", "Reminder notifications"] 
  },
];

const birthdayCustomization: CustomizationOption[] = [
  { 
    category: "Design", 
    options: ["Scheme colorate festive", "Elemente party (baloane, confetti)", "Fonts playful", "Animații distractive"] 
  },
  { 
    category: "Conținut", 
    options: ["Galerie poze (max 40)", "Video tribute", "Timeline viață", "Mesaje de la prieteni"] 
  },
  { 
    category: "Funcționalitate", 
    options: ["RSVP cu număr invitați", "Sugestii cadouri", "Playlist colaborativ", "Games & activities info"] 
  },
];

const anniversaryCustomization: CustomizationOption[] = [
  { 
    category: "Design", 
    options: ["Culori elegante (gold, silver, ruby)", "Style clasic/modern", "Fonts sofisticate", "Galleries premium"] 
  },
  { 
    category: "Conținut", 
    options: ["Fotografii cuplu years (max 60)", "Love story timeline", "Guest messages", "Memory lane"] 
  },
  { 
    category: "Funcționalitate", 
    options: ["RSVP avansat", "Digital guestbook", "Photo sharing", "Email confirmations"] 
  },
];

const corporateCustomization: CustomizationOption[] = [
  { 
    category: "Branding", 
    options: ["Logo companie", "Culori corporate", "Fonts branded", "Professional layouts"] 
  },
  { 
    category: "Conținut", 
    options: ["Company info", "Event description", "Speaker bios with photos", "Sponsor showcase"] 
  },
  { 
    category: "Funcționalitate", 
    options: ["Registration forms", "Ticketing integration", "Agenda scheduling", "Networking features"] 
  },
  { 
    category: "Professional", 
    options: ["Live stream support", "Media kit downloads", "Analytics dashboard", "Multi-language support"] 
  },
];

export const detailedTemplates: TemplateData[] = [
  // Wedding Templates
  {
    id: 1,
    name: "Romantic Rose",
    type: "WEDDING",
    icon: Heart,
    color: "rose",
    image: "bg-gradient-to-br from-rose-200 to-pink-300",
    description: "Design elegant cu motive florale și detalii romantice perfect pentru nunți clasice și rafinate",
    features: ["Hero cu poză cuplu", "Secțiune poveste de dragoste", "Galerie foto interactivă", "Program nuntă", "Harta locație", "Formular RSVP", "Listă cadouri", "Dress code"],
    mockup: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
    sections: weddingSections,
    customization: weddingCustomization,
  },
  {
    id: 2,
    name: "Golden Elegance",
    type: "WEDDING",
    icon: Heart,
    color: "amber",
    image: "bg-gradient-to-br from-amber-200 to-yellow-300",
    description: "Luxos și sofisticat cu accente aurii pentru nunți de lux și evenimente premium",
    features: ["Header video background", "Cronometru numărătoare inversă", "Galerie carousel", "Schedule detaliat", "Secțiune ospitalitate", "RSVP cu opțiuni meniu", "Registry links", "FAQ interactive"],
    mockup: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop",
    sections: weddingSections,
    customization: weddingCustomization,
  },
  {
    id: 3,
    name: "Lavender Dreams",
    type: "WEDDING",
    icon: Heart,
    color: "purple",
    image: "bg-gradient-to-br from-purple-200 to-indigo-300",
    description: "Romantic și delicat cu nuanțe de lavandă ideal pentru nunți în aer liber și grădini",
    features: ["Hero animat", "Timeline poveste", "Galerie grid masonry", "Program ilustrat", "Hartă interactivă", "RSVP cu +1", "Wish list", "Cod vestimentar"],
    mockup: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop",
    sections: weddingSections,
    customization: weddingCustomization,
  },
  {
    id: 4,
    name: "Sunset Love",
    type: "WEDDING",
    icon: Heart,
    color: "orange",
    image: "bg-gradient-to-br from-orange-200 to-red-300",
    description: "Cald și vibrant cu tonuri de apus perfect pentru nunți de vară și beach weddings",
    features: ["Video hero", "Story timeline", "Galerie fullscreen", "Program cu iconițe", "Locație cu poze", "RSVP avansat", "Gift registry", "Info transport"],
    mockup: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1200&fit=crop",
    sections: weddingSections,
    customization: weddingCustomization,
  },
  
  // Baptism Templates
  {
    id: 5,
    name: "Little Angel",
    type: "BAPTISM",
    icon: Baby,
    color: "blue",
    image: "bg-gradient-to-br from-blue-200 to-cyan-300",
    description: "Perfect pentru botez cu motive angelice și design delicat în nuanțe de albastru",
    features: ["Hero cu poză bebeluș", "Info despre copil", "Galerie momentele special", "Detalii ceremonie", "Hartă biserică/restaurant", "Formular RSVP", "Secțiune nași", "Meniu petrecere"],
    mockup: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=1200&fit=crop",
    sections: baptismSections,
    customization: baptismCustomization,
  },
  {
    id: 6,
    name: "Heaven Blessed",
    type: "BAPTISM",
    icon: Baby,
    color: "sky",
    image: "bg-gradient-to-br from-sky-200 to-blue-300",
    description: "Plin de bucurie și binecuvântare cu accente cerești pentru băieței",
    features: ["Header video", "Milestone timeline", "Galerie Instagram-style", "Program detaliat", "Locații multiple", "RSVP cu opțiuni copii", "Info nași", "Dress code sugestat"],
    mockup: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=1200&fit=crop",
    sections: baptismSections,
    customization: baptismCustomization,
  },
  {
    id: 7,
    name: "Sweet Dreams",
    type: "BAPTISM",
    icon: Baby,
    color: "pink",
    image: "bg-gradient-to-br from-pink-200 to-rose-300",
    description: "Delicat și adorabil în roz pastel perfect pentru fetițe",
    features: ["Hero animat", "Prima lună timeline", "Galerie carousel", "Detalii ceremonie ilustrate", "Harta interactivă", "RSVP simplificat", "Secțiune părinți", "Info petrecere"],
    mockup: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=1200&fit=crop",
    sections: baptismSections,
    customization: baptismCustomization,
  },
  {
    id: 8,
    name: "Cloud Nine",
    type: "BAPTISM",
    icon: Baby,
    color: "indigo",
    image: "bg-gradient-to-br from-indigo-200 to-purple-300",
    description: "Ceresc și blând cu nori decorativi ideal pentru botezuri moderne",
    features: ["Hero cu slideshow", "Cronologie creștere", "Galerie masonry", "Program cu timing", "Locații cu preview", "RSVP cu dietary needs", "Despre nași", "Transport info"],
    mockup: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&h=1200&fit=crop",
    sections: baptismSections,
    customization: baptismCustomization,
  },
  
  // Birthday Templates
  {
    id: 9,
    name: "Party Time",
    type: "BIRTHDAY",
    icon: Cake,
    color: "pink",
    image: "bg-gradient-to-br from-pink-300 to-purple-400",
    description: "Vesel și colorat pentru petreceri memorabile cu energie pozitivă",
    features: ["Hero festiv", "Countdown la party", "Galerie highlight-uri anul trecut", "Program activități", "Locație venue", "RSVP quick", "Lista cadouri", "Info dress code"],
    mockup: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1200&fit=crop",
    sections: birthdaySections,
    customization: birthdayCustomization,
  },
  {
    id: 10,
    name: "Confetti Fun",
    type: "BIRTHDAY",
    icon: Cake,
    color: "rainbow",
    image: "bg-gradient-to-br from-red-300 via-yellow-300 to-green-300",
    description: "Plin de energie și confetti animate pentru petreceri explozive",
    features: ["Video hero background", "Age timeline", "Galerie grid", "Schedule cu jocuri", "Venue map", "RSVP cu +kids", "Gift ideas", "Parking info"],
    mockup: "https://images.unsplash.com/photo-1464347744102-11db6282f854?w=800&h=1200&fit=crop",
    sections: birthdaySections,
    customization: birthdayCustomization,
  },
  {
    id: 11,
    name: "Balloon Fiesta",
    type: "BIRTHDAY",
    icon: Cake,
    color: "teal",
    image: "bg-gradient-to-br from-teal-300 to-cyan-400",
    description: "Jucăuș și distractiv cu baloane pentru copii și adulți",
    features: ["Animated hero", "Birthday timeline", "Photo carousel", "Activities program", "Interactive map", "RSVP form", "Wish list", "Theme details"],
    mockup: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=1200&fit=crop",
    sections: birthdaySections,
    customization: birthdayCustomization,
  },
  {
    id: 12,
    name: "Sweet Celebration",
    type: "BIRTHDAY",
    icon: Cake,
    color: "fuchsia",
    image: "bg-gradient-to-br from-fuchsia-300 to-pink-400",
    description: "Dulce și festiv pentru zile speciale și milestone birthdays",
    features: ["Hero cu slideshow", "Memory lane", "Galerie masonry", "Party schedule", "Venue details", "RSVP advanced", "Registry", "FAQ section"],
    mockup: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=1200&fit=crop",
    sections: birthdaySections,
    customization: birthdayCustomization,
  },
  
  // Anniversary Templates
  {
    id: 13,
    name: "Golden Years",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "amber",
    image: "bg-gradient-to-br from-amber-300 to-orange-400",
    description: "Elegant și memorabil pentru aniversări de aur (50 ani) cu stil clasic",
    features: ["Hero cu poză cuplu", "Timeline relație", "Galerie de-a lungul anilor", "Program eveniment", "Locație celebrare", "RSVP", "Mesaje invitați", "Info cazare"],
    mockup: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=1200&fit=crop",
    sections: anniversarySections,
    customization: anniversaryCustomization,
  },
  {
    id: 14,
    name: "Ruby Love",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "red",
    image: "bg-gradient-to-br from-red-300 to-rose-400",
    description: "Pasional și intens pentru aniversări ruby (40 ani) pline de dragoste",
    features: ["Video background hero", "Love story timeline", "Photo gallery carousel", "Celebration schedule", "Venue map", "RSVP with meal choice", "Guest messages", "Accommodation"],
    mockup: "https://images.unsplash.com/photo-1522673607198-f04e8dc7d13c?w=800&h=1200&fit=crop",
    sections: anniversarySections,
    customization: anniversaryCustomization,
  },
  {
    id: 15,
    name: "Silver Moments",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "slate",
    image: "bg-gradient-to-br from-slate-300 to-gray-400",
    description: "Rafinat și clasic pentru aniversări de argint (25 ani) cu eleganță",
    features: ["Elegant hero", "Journey timeline", "Grid photo gallery", "Event program", "Location details", "RSVP form", "Guestbook", "Travel info"],
    mockup: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop",
    sections: anniversarySections,
    customization: anniversaryCustomization,
  },
  {
    id: 16,
    name: "Pearl Memories",
    type: "ANNIVERSARY",
    icon: Calendar,
    color: "cyan",
    image: "bg-gradient-to-br from-cyan-300 to-teal-400",
    description: "Prețios și unic pentru momente speciale și aniversări pearl (30 ani)",
    features: ["Slideshow hero", "Milestone timeline", "Masonry gallery", "Detailed schedule", "Interactive venue map", "Advanced RSVP", "Message wall", "Hotel recommendations"],
    mockup: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b3?w=800&h=1200&fit=crop",
    sections: anniversarySections,
    customization: anniversaryCustomization,
  },
  
  // Corporate Templates
  {
    id: 17,
    name: "Business Conference",
    type: "CORPORATE",
    icon: Briefcase,
    color: "blue",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
    description: "Profesional pentru conferințe business cu design corporate modern",
    features: ["Hero cu logo companie", "Agenda conference", "Speaker profiles", "Session schedule", "Venue & logistics", "Registration form", "Sponsor showcase", "Networking area"],
    mockup: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop",
    sections: corporateSections,
    customization: corporateCustomization,
  },
  {
    id: 18,
    name: "Team Building",
    type: "CORPORATE",
    icon: Briefcase,
    color: "green",
    image: "bg-gradient-to-br from-green-500 to-emerald-600",
    description: "Energizant pentru activități de team building și events corporate dinamice",
    features: ["Dynamic hero", "Event overview", "Activities schedule", "Team challenges", "Location map", "RSVP attendance", "Photo gallery", "Safety guidelines"],
    mockup: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1200&fit=crop",
    sections: corporateSections,
    customization: corporateCustomization,
  },
  {
    id: 19,
    name: "Product Launch",
    type: "CORPORATE",
    icon: Briefcase,
    color: "purple",
    image: "bg-gradient-to-br from-purple-600 to-violet-700",
    description: "Impact maxim pentru lansări de produse cu design modern și atractiv",
    features: ["Video hero product", "Launch timeline", "Product features showcase", "Event schedule", "Venue details", "Registration", "Media kit", "Press contacts"],
    mockup: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200&fit=crop",
    sections: corporateSections,
    customization: corporateCustomization,
  },
  {
    id: 20,
    name: "Annual Gala",
    type: "CORPORATE",
    icon: Briefcase,
    color: "rose",
    image: "bg-gradient-to-br from-rose-600 to-red-700",
    description: "Elegant pentru gale și evenimente corporate de lux cu stil premium",
    features: ["Luxury hero design", "Event highlights", "Guest speakers", "Program & timeline", "Venue showcase", "Ticket registration", "Sponsor gallery", "Dress code & etiquette"],
    mockup: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=1200&fit=crop",
    sections: corporateSections,
    customization: corporateCustomization,
  },
];

// Helper functions
export function getTemplatesByType(type: EventType): TemplateData[] {
  return detailedTemplates.filter(t => t.type === type);
}

export function getTemplateById(id: number): TemplateData | undefined {
  return detailedTemplates.find(t => t.id === id);
}

export function getTemplateCategories() {
  return [
    { id: "ALL", name: "Toate", count: detailedTemplates.length },
    { id: "WEDDING", name: "Nuntă", count: getTemplatesByType("WEDDING").length },
    { id: "BAPTISM", name: "Botez", count: getTemplatesByType("BAPTISM").length },
    { id: "BIRTHDAY", name: "Zi de Naștere", count: getTemplatesByType("BIRTHDAY").length },
    { id: "ANNIVERSARY", name: "Aniversare", count: getTemplatesByType("ANNIVERSARY").length },
    { id: "CORPORATE", name: "Corporativ", count: getTemplatesByType("CORPORATE").length },
  ];
}
