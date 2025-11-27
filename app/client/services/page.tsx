"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Heart,
  Camera,
  Video,
  Music,
  UtensilsCrossed,
  Sparkles,
  Cake,
  Mic2,
  Brush,
  Star,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  Filter,
  Search,
  Image as ImageIcon,
} from "lucide-react";

type VendorCategory =
  | "ALL"
  | "PHOTOGRAPHER"
  | "VIDEOGRAPHER"
  | "MUSICIAN"
  | "CATERING"
  | "DECORATION"
  | "CAKE"
  | "DJ"
  | "MAKEUP";

type EventType = "ALL" | "WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE";

interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  location: string;
  website?: string;
  eventTypes: EventType[];
  image: string;
  featured: boolean;
}

export default function ServicesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory>("ALL");
  const [selectedEventType, setSelectedEventType] = useState<EventType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Mock data
  const vendors: Vendor[] = [
    {
      id: "1",
      name: "Studio Lumina",
      category: "PHOTOGRAPHER",
      description: "Fotografie profesională de nuntă și evenimente. Portfolio premium cu peste 200 de nunți fotografiate.",
      priceRange: "3,000 - 8,000 MDL",
      rating: 4.9,
      reviewCount: 156,
      phone: "+373 69 123 456",
      email: "contact@studiolumina.md",
      location: "Chișinău, Centru",
      website: "https://studiolumina.md",
      eventTypes: ["WEDDING", "BAPTISM", "CORPORATE"],
      image: "📸",
      featured: true,
    },
    {
      id: "2",
      name: "CineVision Pro",
      category: "VIDEOGRAPHER",
      description: "Videografie cinematică 4K. Creăm povești emotionale care durează o viață.",
      priceRange: "4,000 - 12,000 MDL",
      rating: 4.8,
      reviewCount: 98,
      phone: "+373 69 234 567",
      email: "info@cinevision.md",
      location: "Chișinău",
      website: "https://cinevision.md",
      eventTypes: ["WEDDING", "CORPORATE"],
      image: "🎥",
      featured: true,
    },
    {
      id: "3",
      name: "Formația Harmonia",
      category: "MUSICIAN",
      description: "Orchestră live pentru evenimente. Repertoriu vast: de la muzică clasică la populară.",
      priceRange: "5,000 - 15,000 MDL",
      rating: 4.7,
      reviewCount: 84,
      phone: "+373 69 345 678",
      email: "booking@harmonia.md",
      location: "Chișinău, Botanica",
      eventTypes: ["WEDDING", "ANNIVERSARY", "CORPORATE"],
      image: "🎵",
      featured: false,
    },
    {
      id: "4",
      name: "Catering Deluxe",
      category: "CATERING",
      description: "Servicii de catering premium. Meniuri personalizate pentru orice tip de eveniment.",
      priceRange: "150 - 400 MDL/persoană",
      rating: 4.9,
      reviewCount: 203,
      phone: "+373 69 456 789",
      email: "orders@cateringdeluxe.md",
      location: "Chișinău, disponibil în toată țara",
      website: "https://cateringdeluxe.md",
      eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
      image: "🍽️",
      featured: true,
    },
    {
      id: "5",
      name: "Decor & Events",
      category: "DECORATION",
      description: "Design și decorațiuni pentru evenimente. Transformăm visul tău în realitate.",
      priceRange: "2,000 - 10,000 MDL",
      rating: 4.8,
      reviewCount: 127,
      phone: "+373 69 567 890",
      email: "hello@decorevents.md",
      location: "Chișinău, Buiucani",
      eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "CORPORATE"],
      image: "✨",
      featured: false,
    },
    {
      id: "6",
      name: "Sweet Dreams Patisserie",
      category: "CAKE",
      description: "Torturi personalizate premium. Fiecare tort este o operă de artă comestibilă.",
      priceRange: "800 - 3,500 MDL",
      rating: 5.0,
      reviewCount: 245,
      phone: "+373 69 678 901",
      email: "orders@sweetdreams.md",
      location: "Chișinău, Rîșcani",
      website: "https://sweetdreams.md",
      eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY"],
      image: "🎂",
      featured: true,
    },
    {
      id: "7",
      name: "DJ Alex Beats",
      category: "DJ",
      description: "DJ profesionist cu experiență de 10+ ani. Playlist adaptat gusturilor tale.",
      priceRange: "2,000 - 6,000 MDL",
      rating: 4.7,
      reviewCount: 134,
      phone: "+373 69 789 012",
      email: "booking@alexbeats.md",
      location: "Chișinău",
      eventTypes: ["WEDDING", "BIRTHDAY", "CORPORATE"],
      image: "🎧",
      featured: false,
    },
    {
      id: "8",
      name: "Beauty Studio Elegance",
      category: "MAKEUP",
      description: "Machiaj profesional pentru mireasă și invitați. Produse premium și tehnică impecabilă.",
      priceRange: "500 - 2,000 MDL",
      rating: 4.9,
      reviewCount: 178,
      phone: "+373 69 890 123",
      email: "info@elegance.md",
      location: "Chișinău, Centru",
      website: "https://elegance.md",
      eventTypes: ["WEDDING", "ANNIVERSARY"],
      image: "💄",
      featured: false,
    },
  ];

  const categories = [
    { id: "ALL" as VendorCategory, label: "Toate", icon: Sparkles },
    { id: "PHOTOGRAPHER" as VendorCategory, label: "Fotografi", icon: Camera },
    { id: "VIDEOGRAPHER" as VendorCategory, label: "Videografi", icon: Video },
    { id: "MUSICIAN" as VendorCategory, label: "Muzicieni", icon: Music },
    { id: "CATERING" as VendorCategory, label: "Catering", icon: UtensilsCrossed },
    { id: "DECORATION" as VendorCategory, label: "Decorațiuni", icon: Sparkles },
    { id: "CAKE" as VendorCategory, label: "Torturi", icon: Cake },
    { id: "DJ" as VendorCategory, label: "DJ", icon: Mic2 },
    { id: "MAKEUP" as VendorCategory, label: "Machiaj", icon: Brush },
  ];

  const eventTypes = [
    { id: "ALL" as EventType, label: "Toate", emoji: "🎉" },
    { id: "WEDDING" as EventType, label: "Nuntă", emoji: "💒" },
    { id: "BAPTISM" as EventType, label: "Botez", emoji: "👶" },
    { id: "BIRTHDAY" as EventType, label: "Zi de naștere", emoji: "🎂" },
    { id: "ANNIVERSARY" as EventType, label: "Aniversare", emoji: "🎊" },
    { id: "CORPORATE" as EventType, label: "Corporativ", emoji: "💼" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  const toggleFavorite = (vendorId: string) => {
    setFavorites((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const openQuoteModal = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowQuoteModal(true);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory =
      selectedCategory === "ALL" || vendor.category === selectedCategory;
    const matchesEventType =
      selectedEventType === "ALL" || vendor.eventTypes.includes(selectedEventType);
    const matchesSearch =
      searchQuery === "" ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesEventType && matchesSearch;
  });

  const featuredVendors = filteredVendors.filter((v) => v.featured);
  const regularVendors = filteredVendors.filter((v) => !v.featured);

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
              href="/client/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/client/events"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Invitațiile Mele</span>
            </Link>
            <Link
              href="/client/rsvp"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>RSVP</span>
            </Link>
            <Link
              href="/client/services"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Servicii</span>
            </Link>
            <Link
              href="/client/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Setări</span>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Servicii Recomandate
          </h1>
          <p className="text-gray-600">
            Furnizori verificați și recomandați pentru evenimentul tău perfect
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Caută furnizori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Categorie:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Type Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Tip eveniment:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((eventType) => (
                <button
                  key={eventType.id}
                  onClick={() => setSelectedEventType(eventType.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedEventType === eventType.id
                      ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {eventType.emoji} {eventType.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">{filteredVendors.length}</span>{" "}
            furnizori găsiți
            {favorites.length > 0 && (
              <span className="ml-4">
                • <span className="font-semibold text-rose-600">{favorites.length}</span> favoriți
              </span>
            )}
          </p>
        </div>

        {/* Featured Vendors */}
        {featuredVendors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" fill="currentColor" />
              Furnizori Recomandați
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  isFavorite={favorites.includes(vendor.id)}
                  onToggleFavorite={toggleFavorite}
                  onRequestQuote={openQuoteModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Vendors */}
        {regularVendors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {featuredVendors.length > 0 ? "Alți Furnizori" : "Furnizori Disponibili"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  isFavorite={favorites.includes(vendor.id)}
                  onToggleFavorite={toggleFavorite}
                  onRequestQuote={openQuoteModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Niciun furnizor găsit
            </h3>
            <p className="text-gray-600 mb-6">
              Încearcă să modifici filtrele sau termenul de căutare
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedEventType("ALL");
                setSearchQuery("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Resetează Filtrele
            </button>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && selectedVendor && (
        <QuoteModal
          vendor={selectedVendor}
          onClose={() => {
            setShowQuoteModal(false);
            setSelectedVendor(null);
          }}
        />
      )}
    </div>
  );
}

// Vendor Card Component
interface VendorCardProps {
  vendor: Vendor;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRequestQuote: (vendor: Vendor) => void;
}

function VendorCard({ vendor, isFavorite, onToggleFavorite, onRequestQuote }: VendorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
      {/* Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center">
        <div className="text-7xl">{vendor.image}</div>
        {vendor.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="h-3 w-3" fill="currentColor" />
            Recomandat
          </div>
        )}
        <button
          onClick={() => onToggleFavorite(vendor.id)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? "bg-rose-500 text-white"
              : "bg-white text-gray-400 hover:text-rose-500"
          }`}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{vendor.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(vendor.rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                fill="currentColor"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">{vendor.rating}</span>
          <span className="text-sm text-gray-500">({vendor.reviewCount} recenzii)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-lg font-bold text-rose-600">{vendor.priceRange}</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{vendor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{vendor.phone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onRequestQuote(vendor)}
            className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Solicită Ofertă
          </button>
          {vendor.website && (
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Quote Modal Component
interface QuoteModalProps {
  vendor: Vendor;
  onClose: () => void;
}

function QuoteModal({ vendor, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send quote request
    alert(`Solicitare trimisă către ${vendor.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Solicită Ofertă</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Furnizor: <span className="font-semibold">{vendor.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nume Complet *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              placeholder="Ion Popescu"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                placeholder="ion@email.md"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                placeholder="+373 69 123 456"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Data Eveniment *
              </label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tip Eveniment *
              </label>
              <select
                required
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              >
                <option value="">Selectează...</option>
                <option value="WEDDING">Nuntă</option>
                <option value="BAPTISM">Botez</option>
                <option value="BIRTHDAY">Zi de naștere</option>
                <option value="ANNIVERSARY">Aniversare</option>
                <option value="CORPORATE">Corporativ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mesaj / Detalii Suplimentare
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
              placeholder="Descrie cerințele tale pentru eveniment..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Trimite Solicitarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
