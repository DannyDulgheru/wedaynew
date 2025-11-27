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
} from "lucide-react";
import ShareInvitation from "@/components/client/ShareInvitation";

export default function ClientDashboard() {
  const router = useRouter();
  const [events] = useState([
    {
      id: "1",
      title: "Nunta Ana & Mihai",
      type: "WEDDING",
      date: "2024-06-15",
      status: "ACTIVE",
      views: 156,
      rsvps: 45,
    },
  ]);

  const handleLogout = () => {
    // TODO: Implement logout
    router.push("/");
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bine ai venit înapoi!</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-rose-50 rounded-lg">
                <FileText className="h-6 w-6 text-rose-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">1</div>
            <div className="text-gray-600 text-sm">Invitații Active</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">156</div>
            <div className="text-gray-600 text-sm">Vizualizări Totale</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-50 rounded-lg">
                <Users className="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">45</div>
            <div className="text-gray-600 text-sm">Confirmări RSVP</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">32</div>
            <div className="text-gray-600 text-sm">Zile Rămase</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Creează Invitație Nouă</h2>
          <p className="mb-6 opacity-90">
            Începe să creezi o invitație personalizată pentru evenimentul tău special
          </p>
          <Link
            href="/client/events/create"
            className="inline-flex items-center space-x-2 bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>Creează Invitație</span>
          </Link>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Invitațiile Mele</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {event.status}
                  </span>
                </div>

                <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{event.views} vizualizări</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{event.rsvps} confirmări</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/client/events/${event.id}/edit`}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editează</span>
                  </Link>
                  <Link
                    href={`/invite/${event.id}`}
                    target="_blank"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Vizualizează</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Share Invitation Component */}
          {events.length > 0 && (
            <div className="mt-8">
              <ShareInvitation
                invitationUrl={`/invite/ana-mihai-2024`}
                eventTitle={events[0].title}
                eventId={events[0].id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
