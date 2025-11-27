"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  Heart,
  ArrowLeft,
  Save,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
} from "lucide-react";

type EventType = "WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE";
type EventStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface Event {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: EventType;
  status: EventStatus;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  customUrl: string;
  template: string;
  primaryColor: string;
  secondaryColor: string;
  rsvpDeadline: string;
  maxGuests: number;
  totalRsvp: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  allowPlusOne: boolean;
  requireApproval: boolean;
}

export default function AdminEventEditPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  // Mock event data - în producție va veni din API
  const [event, setEvent] = useState<Event>({
    id: eventId,
    userId: "user123",
    userName: "Ana & Mihai Popescu",
    userEmail: "ana.popescu@email.md",
    type: "WEDDING",
    status: "PUBLISHED",
    title: "Nunta Ana & Mihai",
    date: "2025-06-15",
    time: "16:00",
    location: "Restaurant Panorama, Chișinău",
    description:
      "Vă invităm cu drag să fiți alături de noi în această zi specială și să sărbătorim împreună începutul unei noi etape din viața noastră.",
    customUrl: "ana-mihai-2025",
    template: "romantic-roses",
    primaryColor: "#ec4899",
    secondaryColor: "#a855f7",
    rsvpDeadline: "2025-06-01",
    maxGuests: 150,
    totalRsvp: 89,
    viewCount: 342,
    createdAt: "2024-11-10T10:30:00",
    updatedAt: "2024-11-25T14:22:00",
    isPublic: true,
    allowPlusOne: true,
    requireApproval: false,
  });

  const [formData, setFormData] = useState(event);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setEvent(formData);
      setIsSaving(false);
      alert("Eveniment actualizat cu succes!");
    }, 1000);
  };

  const handleDelete = () => {
    // Simulate API call
    alert("Eveniment șters!");
    router.push("/admin/events");
  };

  const getEventTypeEmoji = (type: EventType) => {
    switch (type) {
      case "WEDDING":
        return "💒";
      case "BAPTISM":
        return "🕊️";
      case "BIRTHDAY":
        return "🎂";
      case "ANNIVERSARY":
        return "💝";
      case "CORPORATE":
        return "🏢";
      default:
        return "🎉";
    }
  };

  const getEventTypeName = (type: EventType) => {
    switch (type) {
      case "WEDDING":
        return "Nuntă";
      case "BAPTISM":
        return "Botez";
      case "BIRTHDAY":
        return "Zi de Naștere";
      case "ANNIVERSARY":
        return "Aniversare";
      case "CORPORATE":
        return "Corporate";
      default:
        return type;
    }
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: EventStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "Publicat";
      case "DRAFT":
        return "Draft";
      case "ARCHIVED":
        return "Arhivat";
      default:
        return status;
    }
  };

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
            <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Evenimente</span>
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Setări Site</span>
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
          <Link
            href="/admin/events"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Înapoi la Evenimente</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Editare Eveniment (Admin)
              </h1>
              <p className="text-gray-600">
                Modifică orice detalii ale evenimentului cu permisiuni complete
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/event/${event.customUrl}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Eye className="h-5 w-5" />
                <span>Previzualizează</span>
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                <span>Șterge</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Owner Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Status & Vizibilitate
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Eveniment
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as EventStatus,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Publicat</option>
                    <option value="ARCHIVED">Arhivat</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Public</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublic: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-bold text-gray-800">
                  Informații Proprietar
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Nume</div>
                    <div className="font-semibold text-gray-800">
                      {event.userName}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-semibold text-gray-800">
                      {event.userEmail}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/admin/users/${event.userId}/edit`}
                  className="block w-full mt-3 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-center rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Vezi Utilizator
                </Link>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Statistici Eveniment
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-100 to-purple-100 rounded-lg">
                  <span className="text-gray-700">Vizualizări</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {event.viewCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <span className="text-gray-700">RSVP Primite</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {event.totalRsvp} / {event.maxGuests}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Creat la</div>
                  <div className="font-semibold text-gray-800">
                    {new Date(event.createdAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Ultima modificare
                  </div>
                  <div className="font-semibold text-gray-800">
                    {new Date(event.updatedAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Detalii Eveniment
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tip Eveniment *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as EventType,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  >
                    <option value="WEDDING">💒 Nuntă</option>
                    <option value="BAPTISM">🕊️ Botez</option>
                    <option value="BIRTHDAY">🎂 Zi de Naștere</option>
                    <option value="ANNIVERSARY">💝 Aniversare</option>
                    <option value="CORPORATE">🏢 Corporate</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titlu Eveniment *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    placeholder="Ex: Nunta Ana & Mihai"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ora *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Locație *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      placeholder="Restaurant Panorama, Chișinău"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descriere
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    placeholder="Descriere eveniment..."
                  />
                </div>

                {/* Custom URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Personalizat *
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <div className="flex">
                      <span className="inline-flex items-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                        weday.md/event/
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.customUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, customUrl: e.target.value })
                        }
                        className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        placeholder="ana-mihai-2025"
                      />
                    </div>
                  </div>
                </div>

                {/* Template */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Template
                  </label>
                  <select
                    value={formData.template}
                    onChange={(e) =>
                      setFormData({ ...formData, template: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  >
                    <option value="romantic-roses">Romantic Roses</option>
                    <option value="elegant-gold">Elegant Gold</option>
                    <option value="modern-minimal">Modern Minimal</option>
                    <option value="classic-ivory">Classic Ivory</option>
                    <option value="rustic-charm">Rustic Charm</option>
                  </select>
                </div>

                {/* Colors */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Culoare Primară
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryColor: e.target.value,
                          })
                        }
                        className="h-12 w-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryColor: e.target.value,
                          })
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
                        value={formData.secondaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="h-12 w-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* RSVP Settings */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Setări RSVP
                  </h4>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Termen Limită RSVP
                        </label>
                        <input
                          type="date"
                          value={formData.rsvpDeadline}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rsvpDeadline: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Număr Maxim Invitați
                        </label>
                        <input
                          type="number"
                          value={formData.maxGuests}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maxGuests: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-800">
                          Permite +1
                        </div>
                        <div className="text-sm text-gray-600">
                          Invitații pot aduce un partener
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.allowPlusOne}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              allowPlusOne: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-800">
                          Necesită Aprobare
                        </div>
                        <div className="text-sm text-gray-600">
                          Confirmările trebuie aprobate manual
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.requireApproval}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              requireApproval: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Admin Note */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-purple-900 mb-1">
                        Permisiuni Admin
                      </div>
                      <div className="text-sm text-purple-700">
                        Ai acces complet la toate opțiunile evenimentului,
                        inclusiv modificarea template-ului, culorilor și
                        setărilor avansate. Toate modificările vor fi salvate
                        automat.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/events")}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    <span>
                      {isSaving ? "Se salvează..." : "Salvează Modificările"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Șterge Eveniment
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Ești sigur că vrei să ștergi evenimentul{" "}
              <strong>{event.title}</strong>? Această acțiune nu poate fi
              anulată. Toate datele RSVP și statisticile vor fi pierdute
              permanent.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Șterge Permanent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
