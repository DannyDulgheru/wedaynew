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
  Plus,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Search,
} from "lucide-react";

export default function ClientEventsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [events] = useState([
    {
      id: "1",
      title: "Nunta Ana & Mihai",
      type: "WEDDING",
      date: "2024-06-15",
      status: "ACTIVE",
      views: 156,
      rsvps: 45,
      publicLink: "ana-si-mihai-2024",
    },
    {
      id: "2",
      title: "Botez Maria",
      type: "BAPTISM",
      date: "2024-05-20",
      status: "ACTIVE",
      views: 89,
      rsvps: 32,
      publicLink: "botez-maria-2024",
    },
    {
      id: "3",
      title: "Aniversare 50 ani",
      type: "ANNIVERSARY",
      date: "2024-07-10",
      status: "PENDING",
      views: 23,
      rsvps: 8,
      publicLink: "aniversare-50-ion",
    },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "EXPIRED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "WEDDING":
        return "💒";
      case "BAPTISM":
        return "👶";
      case "BIRTHDAY":
        return "🎂";
      case "ANNIVERSARY":
        return "🎊";
      default:
        return "🎉";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
              <span className="text-xl font-bold font-playfair bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Weday
              </span>
            </Link>
          </div>

          {/* Navigation */}
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Invitațiile Mele</span>
            </Link>
            <Link
              href="/client/rsvp"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>RSVP</span>
            </Link>
            <Link
              href="/client/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Setări</span>
            </Link>
          </nav>

          {/* Logout */}
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Invitațiile Mele</h1>
          <p className="text-gray-600">Gestionează toate invitațiile tale</p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută invitații..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Create Button */}
            <Link
              href="/client/events/create"
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              <span>Invitație Nouă</span>
            </Link>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{getEventTypeIcon(event.type)}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-500">
                      {event.views}
                    </div>
                    <div className="text-xs text-gray-600">Vizualizări</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500">
                      {event.rsvps}
                    </div>
                    <div className="text-xs text-gray-600">Confirmări</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 flex gap-2">
                <Link
                  href={`/client/events/${event.id}/edit`}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm font-semibold">Editează</span>
                </Link>
                <Link
                  href={`/invite/${event.publicLink}`}
                  target="_blank"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-semibold">Vezi</span>
                </Link>
                <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Nicio invitație încă
            </h3>
            <p className="text-gray-600 mb-6">
              Începe să creezi prima ta invitație personalizată
            </p>
            <Link
              href="/client/events/create"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>Creează Invitație</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
