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
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import RevenueCharts from "@/components/admin/RevenueCharts";

export default function AdminDashboard() {
  const router = useRouter();

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
            <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-semibold">Dashboard</span>
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Setări Site</span>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Bine ai venit în panoul de administrare!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-rose-50 rounded-lg">
                <Users className="h-6 w-6 text-rose-500" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">523</div>
            <div className="text-gray-600 text-sm">Total Utilizatori</div>
            <div className="text-green-600 text-xs mt-2">+12% față de luna trecută</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">487</div>
            <div className="text-gray-600 text-sm">Evenimente Active</div>
            <div className="text-green-600 text-xs mt-2">+8% față de luna trecută</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">486,513</div>
            <div className="text-gray-600 text-sm">Venit Total (MDL)</div>
            <div className="text-green-600 text-xs mt-2">+15% față de luna trecută</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-50 rounded-lg">
                <Calendar className="h-6 w-6 text-pink-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">16</div>
            <div className="text-gray-600 text-sm">Template-uri Disponibile</div>
            <div className="text-gray-500 text-xs mt-2">4 tipuri evenimente</div>
          </div>
        </div>

        {/* Revenue Charts Section */}
        <div className="mb-8">
          <RevenueCharts />
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Evenimente Recente</h2>
          <div className="space-y-4">
            {[
              { name: "Nunta Ana & Mihai", type: "Nuntă", date: "2024-06-15", status: "ACTIVE" },
              { name: "Botez Maria", type: "Botez", date: "2024-05-20", status: "ACTIVE" },
              { name: "Aniversare 50 ani", type: "Aniversare", date: "2024-07-10", status: "PENDING" },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <div>
                  <div className="font-semibold text-gray-800">{event.name}</div>
                  <div className="text-sm text-gray-600">{event.type} • {event.date}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Nunți</h3>
            <div className="text-3xl font-bold mb-1">245</div>
            <p className="text-sm opacity-90">50.3% din total evenimente</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Botezuri</h3>
            <div className="text-3xl font-bold mb-1">132</div>
            <p className="text-sm opacity-90">27.1% din total evenimente</p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Alte Evenimente</h3>
            <div className="text-3xl font-bold mb-1">110</div>
            <p className="text-sm opacity-90">22.6% din total evenimente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
