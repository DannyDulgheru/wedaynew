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
  ArrowLeft,
  Check,
} from "lucide-react";
import SectionBuilder, { TemplateSection, EventType } from "@/components/client/SectionBuilder";

export default function CreateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const eventTypes = [
    { id: "WEDDING", name: "Nuntă", emoji: "💍", description: "Sărbătorește ziua specială" },
    { id: "BAPTISM", name: "Botez", emoji: "👶", description: "Primește-ți copilul în comunitate" },
    { id: "BIRTHDAY", name: "Zi de Naștere", emoji: "🎂", description: "Comemorează un an nou" },
    { id: "ANNIVERSARY", name: "Aniversare", emoji: "🎊", description: "Aniversează momente importante" },
    { id: "CORPORATE", name: "Corporativ", emoji: "💼", description: "Evenimente business profesionale" },
  ];

  const templates = {
    WEDDING: [
      { id: "w1", name: "Eleganță Clasică", color: "from-rose-400 to-pink-600" },
      { id: "w2", name: "Romantic Modern", color: "from-purple-400 to-pink-500" },
      { id: "w3", name: "Rustic Vintage", color: "from-amber-400 to-orange-500" },
      { id: "w4", name: "Lux Royal", color: "from-blue-400 to-purple-600" },
    ],
    BAPTISM: [
      { id: "b1", name: "Cer Senin", color: "from-blue-300 to-cyan-400" },
      { id: "b2", name: "Nor Alb", color: "from-gray-200 to-blue-200" },
      { id: "b3", name: "Inocență Roz", color: "from-pink-200 to-rose-300" },
      { id: "b4", name: "Îngeraș", color: "from-yellow-200 to-amber-300" },
    ],
    BIRTHDAY: [
      { id: "bd1", name: "Party Colorat", color: "from-red-400 to-yellow-500" },
      { id: "bd2", name: "Confetti Fun", color: "from-purple-400 to-pink-500" },
      { id: "bd3", name: "Balon Magic", color: "from-blue-400 to-cyan-500" },
      { id: "bd4", name: "Torță Festiv", color: "from-orange-400 to-red-500" },
    ],
    ANNIVERSARY: [
      { id: "a1", name: "Aur Elegant", color: "from-yellow-400 to-amber-600" },
      { id: "a2", name: "Argint Rafinat", color: "from-gray-300 to-slate-500" },
      { id: "a3", name: "Coral Pasional", color: "from-orange-400 to-rose-500" },
      { id: "a4", name: "Ruby Strălucitor", color: "from-red-500 to-rose-700" },
    ],
    CORPORATE: [
      { id: "c1", name: "Business Conference", color: "from-blue-600 to-indigo-700" },
      { id: "c2", name: "Team Building", color: "from-green-500 to-emerald-600" },
      { id: "c3", name: "Product Launch", color: "from-purple-600 to-violet-700" },
      { id: "c4", name: "Annual Gala", color: "from-rose-600 to-red-700" },
    ],
  };

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [sections, setSections] = useState<TemplateSection[]>([]);

  const handleLogout = () => {
    router.push("/");
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setStep(2);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep(3);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Move to section builder
  };

  const handleCreateEvent = () => {
    // TODO: Implement event creation API call with sections
    const eventToCreate = {
      ...eventData,
      type: selectedType,
      template: selectedTemplate,
      sections: sections
        .filter((s) => s.isEnabled)
        .map((s) => ({
          type: s.type,
          name: s.name,
          order: s.order,
          config: s.config,
        })),
    };
    console.log("Creating event:", eventToCreate);
    alert("Eveniment creat cu succes!");
    router.push("/client/events");
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Creează Invitație Nouă
          </h1>
          <p className="text-gray-600">
            Alege tipul evenimentului și personalizează invitația ta
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= 1
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 1 ? <Check className="h-6 w-6" /> : "1"}
            </div>
            <div className="text-xs font-semibold text-gray-700">Tip</div>
            <div
              className={`w-12 h-1 ${
                step >= 2 ? "bg-gradient-to-r from-rose-500 to-purple-600" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= 2
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 2 ? <Check className="h-6 w-6" /> : "2"}
            </div>
            <div className="text-xs font-semibold text-gray-700">Template</div>
            <div
              className={`w-12 h-1 ${
                step >= 3 ? "bg-gradient-to-r from-rose-500 to-purple-600" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= 3
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 3 ? <Check className="h-6 w-6" /> : "3"}
            </div>
            <div className="text-xs font-semibold text-gray-700">Detalii</div>
            <div
              className={`w-12 h-1 ${
                step >= 4 ? "bg-gradient-to-r from-rose-500 to-purple-600" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                step >= 4
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              4
            </div>
            <div className="text-xs font-semibold text-gray-700">Secțiuni</div>
          </div>
        </div>

        {/* Step 1: Choose Event Type */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-rose-500 group"
              >
                <div className="text-6xl mb-4">{type.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-500">
                  {type.name}
                </h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Choose Template */}
        {step === 2 && selectedType && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Schimbă tipul evenimentului</span>
            </button>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates[selectedType as keyof typeof templates].map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="group"
                >
                  <div
                    className={`bg-gradient-to-br ${template.color} rounded-2xl p-8 h-64 shadow-md hover:shadow-xl transition-all border-4 border-transparent hover:border-white relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                    <div className="relative h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold mb-2">
                          {template.name}
                        </div>
                        <div className="text-sm opacity-90">
                          Click pentru a selecta
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Event Details */}
        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Schimbă template-ul</span>
            </button>
            <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Detalii Eveniment
              </h2>
              <form onSubmit={handleSubmitDetails} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titlu Eveniment *
                  </label>
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) =>
                      setEventData({ ...eventData, title: e.target.value })
                    }
                    placeholder="ex: Nunta Ana & Mihai"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data Eveniment *
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ora *
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Locație *
                  </label>
                  <input
                    type="text"
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                    placeholder="ex: Restaurant Symposium, Chișinău"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descriere (opțional)
                  </label>
                  <textarea
                    value={eventData.description}
                    onChange={(e) =>
                      setEventData({ ...eventData, description: e.target.value })
                    }
                    placeholder="Adaugă mai multe detalii despre eveniment..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => router.push("/client/events")}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Continuă la Secțiuni →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: Section Builder */}
        {step === 4 && (
          <div>
            <button
              onClick={() => setStep(3)}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Înapoi la detalii</span>
            </button>
            <div className="bg-white rounded-2xl shadow-md p-8 max-w-5xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Construiește Secțiunile Invitației
                </h2>
                <p className="text-gray-600">
                  Personalizează ce secțiuni vor apărea în invitația ta și ordinea lor
                </p>
              </div>

              <SectionBuilder
                eventType={selectedType as EventType}
                onSectionsChange={(newSections) => setSections(newSections)}
              />

              <div className="flex justify-end space-x-4 pt-8 mt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push("/client/events")}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Anulează
                </button>
                <button
                  type="button"
                  onClick={handleCreateEvent}
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Finalizează & Creează Invitația
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
