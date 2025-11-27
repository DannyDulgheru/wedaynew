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
  Search,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  User as UserIcon,
  ExternalLink,
  Edit,
} from "lucide-react";

export default function AdminEventsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const [events] = useState([
    {
      id: "1",
      title: "Nunta Ana & Mihai",
      type: "WEDDING",
      emoji: "💍",
      date: "2024-07-20",
      location: "Restaurant Symposium",
      clientName: "Ana Popescu",
      clientEmail: "ana@email.md",
      status: "ACTIVE",
      views: 342,
      rsvpCount: 45,
      publicLink: "ana-mihai-2024",
      createdAt: "2024-04-10",
    },
    {
      id: "2",
      title: "Botezul Mariei",
      type: "BAPTISM",
      emoji: "👶",
      date: "2024-06-15",
      location: "Biserica Sf. Nicolae",
      clientName: "Ion Ionescu",
      clientEmail: "ion@email.md",
      status: "ACTIVE",
      views: 156,
      rsvpCount: 28,
      publicLink: "botez-maria-2024",
      createdAt: "2024-04-15",
    },
    {
      id: "3",
      title: "Aniversare 50 Ani",
      type: "ANNIVERSARY",
      emoji: "🎊",
      date: "2024-05-25",
      location: "Casă Privată",
      clientName: "Maria Rusu",
      clientEmail: "maria@email.md",
      status: "EXPIRED",
      views: 89,
      rsvpCount: 15,
      publicLink: "aniversare-50",
      createdAt: "2024-03-20",
    },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  const handleView = (publicLink: string) => {
    window.open(`/invite/${publicLink}`, "_blank");
  };

  const handleDelete = (eventId: string) => {
    if (confirm("Ești sigur că vrei să ștergi acest eveniment?")) {
      // TODO: Implement delete event API call
      alert(`Eveniment ${eventId} șters`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            Activ
          </span>
        );
      case "EXPIRED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            Expirat
          </span>
        );
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            În Așteptare
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: events.length,
    wedding: events.filter((e) => e.type === "WEDDING").length,
    baptism: events.filter((e) => e.type === "BAPTISM").length,
    birthday: events.filter((e) => e.type === "BIRTHDAY").length,
    anniversary: events.filter((e) => e.type === "ANNIVERSARY").length,
    active: events.filter((e) => e.status === "ACTIVE").length,
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestionare Evenimente
          </h1>
          <p className="text-gray-600">
            Administrează toate evenimentele create de utilizatori
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {stats.total}
            </div>
            <div className="text-gray-600 text-sm">Total</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-2xl mb-1">💍</div>
            <div className="text-2xl font-bold text-rose-500 mb-1">
              {stats.wedding}
            </div>
            <div className="text-gray-600 text-sm">Nunți</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-2xl mb-1">👶</div>
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {stats.baptism}
            </div>
            <div className="text-gray-600 text-sm">Botezuri</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-2xl mb-1">🎂</div>
            <div className="text-2xl font-bold text-purple-500 mb-1">
              {stats.birthday}
            </div>
            <div className="text-gray-600 text-sm">Zile Naștere</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-2xl mb-1">🎊</div>
            <div className="text-2xl font-bold text-amber-500 mb-1">
              {stats.anniversary}
            </div>
            <div className="text-gray-600 text-sm">Aniversări</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-green-500 mb-1">
              {stats.active}
            </div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută după titlu, client, locație..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterType === "ALL"
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Toate
              </button>
              <button
                onClick={() => setFilterType("WEDDING")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterType === "WEDDING"
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                💍 Nunți
              </button>
              <button
                onClick={() => setFilterType("BAPTISM")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterType === "BAPTISM"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                👶 Botezuri
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Eveniment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data & Locație
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statistici
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{event.emoji}</div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Weday.md/invite/{event.publicLink}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{event.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-800">
                            {event.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.clientEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-700">
                            {new Date(event.date).toLocaleDateString("ro-RO")}
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(event.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-blue-500" />
                          <span>{event.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-green-500" />
                          <span>{event.rsvpCount} RSVP</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Edit as Admin"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleView(event.publicLink)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Vezi invitația"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Șterge"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
