"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Heart,
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Clock,
  Type,
  Palette,
} from "lucide-react";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  // Mock data - în realitate ar veni din API
  const [eventData, setEventData] = useState({
    title: "Nunta Ana & Mihai",
    type: "WEDDING",
    date: "2024-07-20",
    time: "18:00",
    location: "Restaurant Symposium, Chișinău",
    description: "Vă invităm să împărtășiți bucuria zilei noastre speciale!",
    groomName: "Mihai Popescu",
    brideName: "Ana Ionescu",
    ceremony: "Biserica Sf. Nicolae, ora 16:00",
    reception: "Restaurant Symposium, ora 18:00",
    dressCode: "Elegant / Formal",
    publicLink: "ana-mihai-2024",
    templateId: "w1",
    templateColor: "from-rose-400 to-pink-600",
  });

  const [activeTab, setActiveTab] = useState("details");

  const handleLogout = () => {
    router.push("/");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update event
    alert("Eveniment actualizat cu succes!");
  };

  const handlePreview = () => {
    window.open(`/invite/${eventData.publicLink}`, "_blank");
  };

  const handleDelete = () => {
    if (confirm("Ești sigur că vrei să ștergi acest eveniment? Acțiunea nu poate fi anulată.")) {
      // TODO: Implement delete API call
      router.push("/client/events");
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
                WedayInvite
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
          <Link
            href="/client/events"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Înapoi la Invitații</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Editează Invitația
              </h1>
              <p className="text-gray-600">
                Personalizează invitația pentru {eventData.title}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Eye className="h-5 w-5" />
                <span>Previzualizare</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                <span>Șterge</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-md border-b border-gray-200">
          <div className="flex space-x-8 px-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 font-semibold border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Detalii Generale
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`py-4 font-semibold border-b-2 transition-colors ${
                activeTab === "content"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Conținut Personalizat
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`py-4 font-semibold border-b-2 transition-colors ${
                activeTab === "design"
                  ? "border-rose-500 text-rose-500"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Design & Template
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-b-2xl shadow-md p-8">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Type className="h-4 w-4" />
                  <span>Titlu Eveniment *</span>
                </label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData({ ...eventData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Data *</span>
                  </label>
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) =>
                      setEventData({ ...eventData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>Ora *</span>
                  </label>
                  <input
                    type="time"
                    value={eventData.time}
                    onChange={(e) =>
                      setEventData({ ...eventData, time: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Locație *</span>
                </label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) =>
                    setEventData({ ...eventData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descriere
                </label>
                <textarea
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Link Public
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">wedayinvite.md/invite/</span>
                  <input
                    type="text"
                    value={eventData.publicLink}
                    onChange={(e) =>
                      setEventData({ ...eventData, publicLink: e.target.value })
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numele Mirelui
                  </label>
                  <input
                    type="text"
                    value={eventData.groomName}
                    onChange={(e) =>
                      setEventData({ ...eventData, groomName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numele Miresei
                  </label>
                  <input
                    type="text"
                    value={eventData.brideName}
                    onChange={(e) =>
                      setEventData({ ...eventData, brideName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ceremonie
                </label>
                <input
                  type="text"
                  value={eventData.ceremony}
                  onChange={(e) =>
                    setEventData({ ...eventData, ceremony: e.target.value })
                  }
                  placeholder="ex: Biserica Sf. Nicolae, ora 16:00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recepție
                </label>
                <input
                  type="text"
                  value={eventData.reception}
                  onChange={(e) =>
                    setEventData({ ...eventData, reception: e.target.value })
                  }
                  placeholder="ex: Restaurant Symposium, ora 18:00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={eventData.dressCode}
                  onChange={(e) =>
                    setEventData({ ...eventData, dressCode: e.target.value })
                  }
                  placeholder="ex: Elegant / Formal"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imagine Fundal
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-rose-500 transition-colors cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Click pentru a încărca o imagine
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG până la 5MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Design Tab */}
          {activeTab === "design" && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-4">
                  <Palette className="h-4 w-4" />
                  <span>Schimbă Template-ul</span>
                </label>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { id: "w1", name: "Eleganță Clasică", color: "from-rose-400 to-pink-600" },
                    { id: "w2", name: "Romantic Modern", color: "from-purple-400 to-pink-500" },
                    { id: "w3", name: "Rustic Vintage", color: "from-amber-400 to-orange-500" },
                    { id: "w4", name: "Lux Royal", color: "from-blue-400 to-purple-600" },
                  ].map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() =>
                        setEventData({
                          ...eventData,
                          templateId: template.id,
                          templateColor: template.color,
                        })
                      }
                      className={`rounded-lg p-4 transition-all ${
                        eventData.templateId === template.id
                          ? "ring-4 ring-rose-500"
                          : ""
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-br ${template.color} rounded-lg h-32 mb-2`}
                      />
                      <div className="text-sm font-semibold text-gray-700">
                        {template.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Notă:</strong> Schimbarea template-ului va păstra toate informațiile
                  dar va schimba paleta de culori și stilul vizual.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-8 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push("/client/events")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Save className="h-5 w-5" />
              <span>Salvează Modificările</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
