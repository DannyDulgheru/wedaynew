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
  CheckCircle,
  XCircle,
  Download,
  Search,
  Filter,
  BarChart3,
  Grid,
} from "lucide-react";
import RSVPCharts from "@/components/client/RSVPCharts";
import SeatingChart from "@/components/client/SeatingChart";

type RSVPStatus = "ATTENDING" | "NOT_ATTENDING" | "MAYBE";
type TabType = "list" | "charts" | "seating";

interface RSVP {
  id: string;
  eventId: string;
  eventTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  status: RSVPStatus;
  numberOfGuests: number;
  message?: string;
  createdAt: string;
}

export default function ClientRSVPPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [rsvps] = useState<RSVP[]>([
    {
      id: "1",
      eventId: "1",
      eventTitle: "Nunta Ana & Mihai",
      guestName: "Ion Popescu",
      guestEmail: "ion@email.md",
      guestPhone: "+373 60 123 456",
      status: "ATTENDING",
      numberOfGuests: 2,
      message: "Ne bucurăm să fim alături de voi!",
      createdAt: "2024-04-15T10:30:00",
    },
    {
      id: "2",
      eventId: "1",
      eventTitle: "Nunta Ana & Mihai",
      guestName: "Maria Ionescu",
      guestEmail: "maria@email.md",
      guestPhone: "+373 69 987 654",
      status: "ATTENDING",
      numberOfGuests: 3,
      message: "Cu mare drag vom fi prezenți!",
      createdAt: "2024-04-16T14:20:00",
    },
    {
      id: "3",
      eventId: "1",
      eventTitle: "Nunta Ana & Mihai",
      guestName: "Andrei Sandu",
      guestEmail: "andrei@email.md",
      status: "NOT_ATTENDING",
      numberOfGuests: 1,
      message: "Din păcate nu vom putea participa.",
      createdAt: "2024-04-17T09:15:00",
    },
    {
      id: "4",
      eventId: "1",
      eventTitle: "Nunta Ana & Mihai",
      guestName: "Elena Rusu",
      guestEmail: "elena@email.md",
      guestPhone: "+373 68 555 333",
      status: "MAYBE",
      numberOfGuests: 2,
      message: "Vom confirma mai târziu.",
      createdAt: "2024-04-18T16:45:00",
    },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ATTENDING":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "NOT_ATTENDING":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "MAYBE":
        return <span className="text-yellow-500">🤔</span>;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ATTENDING":
        return "Participă";
      case "NOT_ATTENDING":
        return "Nu participă";
      case "MAYBE":
        return "Poate";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ATTENDING":
        return "bg-green-100 text-green-700";
      case "NOT_ATTENDING":
        return "bg-red-100 text-red-700";
      case "MAYBE":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.status === "ATTENDING").length,
    notAttending: rsvps.filter((r) => r.status === "NOT_ATTENDING").length,
    maybe: rsvps.filter((r) => r.status === "MAYBE").length,
    totalGuests: rsvps
      .filter((r) => r.status === "ATTENDING")
      .reduce((sum, r) => sum + r.numberOfGuests, 0),
  };

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    alert("Export CSV - funcționalitate în dezvoltare");
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <Users className="h-5 w-5" />
              <span className="font-semibold">RSVP</span>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Confirmări RSVP
          </h1>
          <p className="text-gray-600">
            Vezi cine a confirmat participarea la evenimentele tale
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "list"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Listă RSVP</span>
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "charts"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Statistici</span>
          </button>
          <button
            onClick={() => setActiveTab("seating")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "seating"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
            }`}
          >
            <Grid className="h-5 w-5" />
            <span>Aranjament Mese</span>
          </button>
        </div>

        {/* Charts Tab */}
        {activeTab === "charts" && <RSVPCharts rsvps={rsvps} />}

        {/* Seating Chart Tab */}
        {activeTab === "seating" && (
          <SeatingChart
            guests={rsvps
              .filter((r) => r.status === "ATTENDING")
              .map((r) => ({
                id: r.id,
                name: r.guestName,
                email: r.guestEmail,
                numberOfGuests: r.numberOfGuests,
              }))}
          />
        )}

        {/* List Tab */}
        {activeTab === "list" && (
          <div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Caută după nume, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterStatus === "ALL"
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Toate
              </button>
              <button
                onClick={() => setFilterStatus("ATTENDING")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterStatus === "ATTENDING"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Participă
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span className="font-semibold">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* RSVP List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invitat
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nr. Persoane
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mesaj
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">
                        {rsvp.guestName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {rsvp.eventTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {rsvp.guestEmail}
                      </div>
                      {rsvp.guestPhone && (
                        <div className="text-sm text-gray-500">
                          {rsvp.guestPhone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(rsvp.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            rsvp.status
                          )}`}
                        >
                          {getStatusText(rsvp.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-semibold">
                        {rsvp.numberOfGuests}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {rsvp.message || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {new Date(rsvp.createdAt).toLocaleDateString("ro-RO")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </div>
        )}
      </div>
    </div>
  );
}
