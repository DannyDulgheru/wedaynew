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
  Plus,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import TemplateEditor from "@/components/admin/TemplateEditor";

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [filterType, setFilterType] = useState("ALL");
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: string; name: string } | null>(null);

  const [templates] = useState([
    // Wedding Templates
    { id: "w1", name: "Eleganță Clasică", type: "WEDDING", emoji: "💍", color: "from-rose-400 to-pink-600", isActive: true, usageCount: 23 },
    { id: "w2", name: "Romantic Modern", type: "WEDDING", emoji: "💍", color: "from-purple-400 to-pink-500", isActive: true, usageCount: 18 },
    { id: "w3", name: "Rustic Vintage", type: "WEDDING", emoji: "💍", color: "from-amber-400 to-orange-500", isActive: true, usageCount: 15 },
    { id: "w4", name: "Lux Royal", type: "WEDDING", emoji: "💍", color: "from-blue-400 to-purple-600", isActive: true, usageCount: 12 },
    
    // Baptism Templates
    { id: "b1", name: "Cer Senin", type: "BAPTISM", emoji: "👶", color: "from-blue-300 to-cyan-400", isActive: true, usageCount: 8 },
    { id: "b2", name: "Nor Alb", type: "BAPTISM", emoji: "👶", color: "from-gray-200 to-blue-200", isActive: true, usageCount: 6 },
    { id: "b3", name: "Inocență Roz", type: "BAPTISM", emoji: "👶", color: "from-pink-200 to-rose-300", isActive: true, usageCount: 5 },
    { id: "b4", name: "Îngeraș", type: "BAPTISM", emoji: "👶", color: "from-yellow-200 to-amber-300", isActive: false, usageCount: 3 },
    
    // Birthday Templates
    { id: "bd1", name: "Party Colorat", type: "BIRTHDAY", emoji: "🎂", color: "from-red-400 to-yellow-500", isActive: true, usageCount: 10 },
    { id: "bd2", name: "Confetti Fun", type: "BIRTHDAY", emoji: "🎂", color: "from-purple-400 to-pink-500", isActive: true, usageCount: 9 },
    { id: "bd3", name: "Balon Magic", type: "BIRTHDAY", emoji: "🎂", color: "from-blue-400 to-cyan-500", isActive: true, usageCount: 7 },
    { id: "bd4", name: "Torță Festiv", type: "BIRTHDAY", emoji: "🎂", color: "from-orange-400 to-red-500", isActive: true, usageCount: 4 },
    
    // Anniversary Templates
    { id: "a1", name: "Aur Elegant", type: "ANNIVERSARY", emoji: "🎊", color: "from-yellow-400 to-amber-600", isActive: true, usageCount: 6 },
    { id: "a2", name: "Argint Rafinat", type: "ANNIVERSARY", emoji: "🎊", color: "from-gray-300 to-slate-500", isActive: true, usageCount: 5 },
    { id: "a3", name: "Coral Pasional", type: "ANNIVERSARY", emoji: "🎊", color: "from-orange-400 to-rose-500", isActive: true, usageCount: 4 },
    { id: "a4", name: "Ruby Strălucitor", type: "ANNIVERSARY", emoji: "🎊", color: "from-red-500 to-rose-700", isActive: false, usageCount: 2 },
    
    // Corporate Templates
    { id: "c1", name: "Business Conference", type: "CORPORATE", emoji: "💼", color: "from-blue-600 to-indigo-700", isActive: true, usageCount: 8 },
    { id: "c2", name: "Team Building", type: "CORPORATE", emoji: "💼", color: "from-green-500 to-emerald-600", isActive: true, usageCount: 5 },
    { id: "c3", name: "Product Launch", type: "CORPORATE", emoji: "💼", color: "from-purple-600 to-violet-700", isActive: true, usageCount: 4 },
    { id: "c4", name: "Annual Gala", type: "CORPORATE", emoji: "💼", color: "from-rose-600 to-red-700", isActive: true, usageCount: 3 },
  ]);

  const handleLogout = () => {
    router.push("/");
  };

  const handleEdit = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate({ id: template.id, name: template.name });
      setShowEditor(true);
    }
  };

  const handleSaveTemplate = (html: string, css: string) => {
    // TODO: Implement save template API call
    console.log("Saving template:", selectedTemplate?.id, { html, css });
    setShowEditor(false);
    alert("Template salvat cu succes!");
  };

  const handleDelete = (templateId: string) => {
    if (confirm("Ești sigur că vrei să ștergi acest template?")) {
      // TODO: Implement delete template API call
      alert(`Template ${templateId} șters`);
    }
  };

  const handleToggleActive = (templateId: string) => {
    // TODO: Implement toggle active API call
    alert(`Toggle active pentru template ${templateId}`);
  };

  const filteredTemplates = filterType === "ALL" 
    ? templates 
    : templates.filter(t => t.type === filterType);

  const stats = {
    total: templates.length,
    wedding: templates.filter(t => t.type === "WEDDING").length,
    baptism: templates.filter(t => t.type === "BAPTISM").length,
    birthday: templates.filter(t => t.type === "BIRTHDAY").length,
    anniversary: templates.filter(t => t.type === "ANNIVERSARY").length,
    corporate: templates.filter(t => t.type === "CORPORATE").length,
    active: templates.filter(t => t.isActive).length,
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
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Evenimente</span>
            </Link>
            <Link
              href="/admin/templates"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="font-semibold">Template-uri</span>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gestionare Template-uri
              </h1>
              <p className="text-gray-600">
                Administrează toate template-urile disponibile pentru clienți
              </p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              <Plus className="h-5 w-5" />
              <span>Template Nou</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {stats.total}
            </div>
            <div className="text-gray-600 text-sm">Total Template-uri</div>
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
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "ALL"
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toate ({stats.total})
            </button>
            <button
              onClick={() => setFilterType("WEDDING")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "WEDDING"
                  ? "bg-rose-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💍 Nunți ({stats.wedding})
            </button>
            <button
              onClick={() => setFilterType("BAPTISM")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "BAPTISM"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              👶 Botezuri ({stats.baptism})
            </button>
            <button
              onClick={() => setFilterType("BIRTHDAY")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "BIRTHDAY"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🎂 Zile Naștere ({stats.birthday})
            </button>
            <button
              onClick={() => setFilterType("ANNIVERSARY")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "ANNIVERSARY"
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🎊 Aniversări ({stats.anniversary})
            </button>
            <button
              onClick={() => setFilterType("CORPORATE")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                filterType === "CORPORATE"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💼 Corporative ({stats.corporate})
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-md overflow-hidden group">
              <div className={`bg-gradient-to-br ${template.color} h-48 relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">{template.emoji}</div>
                </div>
                <div className="absolute top-3 right-3">
                  {template.isActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Activ
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      Inactiv
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{template.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{template.type}</span>
                  <span className="font-semibold">{template.usageCount} utilizări</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(template.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  >
                    {template.isActive ? (
                      <ToggleRight className="h-4 w-4" />
                    ) : (
                      <ToggleLeft className="h-4 w-4" />
                    )}
                    <span>{template.isActive ? "Dezactivează" : "Activează"}</span>
                  </button>
                  <button
                    onClick={() => handleEdit(template.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editează"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Șterge"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Editor Modal */}
      {showEditor && selectedTemplate && (
        <TemplateEditor
          templateId={selectedTemplate.id}
          templateName={selectedTemplate.name}
          onClose={() => setShowEditor(false)}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  );
}
