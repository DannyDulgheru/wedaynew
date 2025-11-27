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
  UserX,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  AlertTriangle,
} from "lucide-react";

type UserRole = "CLIENT" | "ADMIN";
type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
  eventsCount: number;
  rsvpCount: number;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
}

export default function AdminUserEditPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  // Mock user data - în producție va veni din API
  const [user, setUser] = useState<User>({
    id: userId,
    name: "Ion Popescu",
    email: "ion.popescu@email.md",
    phone: "+373 69 123 456",
    role: "CLIENT",
    status: "ACTIVE",
    createdAt: "2024-01-15T10:30:00",
    lastLogin: "2024-11-25T14:22:00",
    eventsCount: 3,
    rsvpCount: 45,
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
  });

  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock activity log
  const activityLog: ActivityLog[] = [
    {
      id: "1",
      action: "LOGIN",
      description: "Autentificare reușită",
      timestamp: "2024-11-25T14:22:00",
      ipAddress: "178.156.23.45",
    },
    {
      id: "2",
      action: "EVENT_CREATED",
      description: "A creat invitația 'Nunta Ana & Mihai'",
      timestamp: "2024-11-24T10:15:00",
      ipAddress: "178.156.23.45",
    },
    {
      id: "3",
      action: "PROFILE_UPDATED",
      description: "A actualizat informațiile de contact",
      timestamp: "2024-11-20T16:30:00",
      ipAddress: "178.156.23.45",
    },
    {
      id: "4",
      action: "RSVP_RECEIVED",
      description: "A primit 5 confirmări RSVP",
      timestamp: "2024-11-18T09:45:00",
      ipAddress: "178.156.23.45",
    },
    {
      id: "5",
      action: "LOGIN",
      description: "Autentificare reușită",
      timestamp: "2024-11-15T11:20:00",
      ipAddress: "178.156.23.45",
    },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setUser({ ...user, ...formData });
      setIsSaving(false);
      alert("Utilizator actualizat cu succes!");
    }, 1000);
  };

  const handleSuspendAccount = () => {
    setFormData({ ...formData, status: "SUSPENDED" });
    setUser({ ...user, status: "SUSPENDED" });
    setShowSuspendModal(false);
    alert("Cont suspendat!");
  };

  const handleActivateAccount = () => {
    setFormData({ ...formData, status: "ACTIVE" });
    setUser({ ...user, status: "ACTIVE" });
    setShowActivateModal(false);
    alert("Cont activat!");
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "SUSPENDED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "Activ";
      case "SUSPENDED":
        return "Suspendat";
      case "PENDING":
        return "În așteptare";
      default:
        return status;
    }
  };

  const getRoleText = (role: UserRole) => {
    return role === "ADMIN" ? "Administrator" : "Client";
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "🔐";
      case "EVENT_CREATED":
        return "📝";
      case "PROFILE_UPDATED":
        return "👤";
      case "RSVP_RECEIVED":
        return "✉️";
      default:
        return "📌";
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <Users className="h-5 w-5" />
              <span className="font-semibold">Utilizatori</span>
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
            href="/admin/users"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Înapoi la Utilizatori</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Editare Utilizator
          </h1>
          <p className="text-gray-600">
            Modifică datele utilizatorului și gestionează permisiunile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Status Cont</h3>
              <div className="space-y-4">
                <div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {getStatusText(user.status)}
                  </span>
                </div>

                {user.status === "ACTIVE" ? (
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    <UserX className="h-5 w-5" />
                    <span>Suspendă Contul</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowActivateModal(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    <UserCheck className="h-5 w-5" />
                    <span>Activează Contul</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Statistici</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Evenimente</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {user.eventsCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">RSVP Primite</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {user.rsvpCount}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Înregistrat</span>
                  </div>
                  <div className="text-gray-800 font-semibold">
                    {new Date(user.createdAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <Activity className="h-4 w-4" />
                    <span>Ultima autentificare</span>
                  </div>
                  <div className="text-gray-800 font-semibold">
                    {new Date(user.lastLogin).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Informații Utilizator
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nume Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    placeholder="Ion Popescu"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      placeholder="ion@email.md"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                      placeholder="+373 69 123 456"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rol *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as UserRole,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none appearance-none"
                    >
                      <option value="CLIENT">Client</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Administratorii au acces complet la panoul de administrare
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Cont *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as UserStatus,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  >
                    <option value="ACTIVE">Activ</option>
                    <option value="SUSPENDED">Suspendat</option>
                    <option value="PENDING">În așteptare</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/users")}
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
                    <span>{isSaving ? "Se salvează..." : "Salvează Modificările"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-500" />
                Istoric Activitate
              </h3>

              <div className="space-y-4">
                {activityLog.map((log, index) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-3xl">{getActionIcon(log.action)}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {log.description}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {new Date(log.timestamp).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        IP: {log.ipAddress}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Suspendă Contul
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Ești sigur că vrei să suspenzi contul utilizatorului{" "}
              <strong>{user.name}</strong>? Utilizatorul nu va mai putea accesa
              platforma.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleSuspendAccount}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Suspendă
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Activează Contul</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Vrei să activezi contul utilizatorului <strong>{user.name}</strong>?
              Utilizatorul va putea accesa din nou platforma.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowActivateModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleActivateAccount}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Activează
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
