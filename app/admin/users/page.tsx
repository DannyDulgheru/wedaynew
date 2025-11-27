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
  Filter,
  Edit,
  Trash2,
  UserPlus,
  Crown,
  User,
} from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  const [users] = useState([
    {
      id: "1",
      name: "Ana Popescu",
      email: "ana@email.md",
      phone: "+373 60 123 456",
      role: "CLIENT",
      status: "ACTIVE",
      eventsCount: 3,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Ion Ionescu",
      email: "ion@email.md",
      phone: "+373 69 987 654",
      role: "CLIENT",
      status: "ACTIVE",
      eventsCount: 1,
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Admin Principal",
      email: "admin@Weday.md",
      phone: "+373 68 555 333",
      role: "ADMIN",
      status: "ACTIVE",
      eventsCount: 0,
      createdAt: "2023-12-01",
    },
    {
      id: "4",
      name: "Maria Rusu",
      email: "maria@email.md",
      phone: "+373 67 444 222",
      role: "CLIENT",
      status: "INACTIVE",
      eventsCount: 0,
      createdAt: "2024-03-10",
    },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  const handleEdit = (userId: string) => {
    // TODO: Implement edit user
    alert(`Editare utilizator ${userId}`);
  };

  const handleDelete = (userId: string) => {
    if (confirm("Ești sigur că vrei să ștergi acest utilizator?")) {
      // TODO: Implement delete user API call
      alert(`Utilizator ${userId} șters`);
    }
  };

  const getRoleIcon = (role: string) => {
    return role === "ADMIN" ? (
      <Crown className="h-5 w-5 text-yellow-500" />
    ) : (
      <User className="h-5 w-5 text-blue-500" />
    );
  };

  const getRoleBadge = (role: string) => {
    return role === "ADMIN" ? (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        Admin
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        Client
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "ACTIVE" ? (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        Activ
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
        Inactiv
      </span>
    );
  };

  const stats = {
    total: users.length,
    clients: users.filter((u) => u.role === "CLIENT").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    active: users.filter((u) => u.status === "ACTIVE").length,
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestionare Utilizatori
          </h1>
          <p className="text-gray-600">
            Administrează toți utilizatorii platformei
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {stats.total}
            </div>
            <div className="text-gray-600 text-sm">Total Utilizatori</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-500 mb-1">
              {stats.clients}
            </div>
            <div className="text-gray-600 text-sm">Clienți</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-yellow-500 mb-1">
              {stats.admins}
            </div>
            <div className="text-gray-600 text-sm">Administratori</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-green-500 mb-1">
              {stats.active}
            </div>
            <div className="text-gray-600 text-sm">Activi</div>
          </div>
        </div>

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
                onClick={() => setFilterRole("ALL")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterRole === "ALL"
                    ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Toți
              </button>
              <button
                onClick={() => setFilterRole("CLIENT")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterRole === "CLIENT"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Clienți
              </button>
              <button
                onClick={() => setFilterRole("ADMIN")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  filterRole === "ADMIN"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Admini
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                <UserPlus className="h-5 w-5" />
                <span>Utilizator Nou</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Utilizator
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evenimente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Data Înscriere
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {getRoleIcon(user.role)}
                        <div className="font-semibold text-gray-800">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-700">
                        {user.eventsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString("ro-RO")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editează"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
