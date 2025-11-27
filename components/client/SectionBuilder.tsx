"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Eye,
  EyeOff,
  Settings,
  Trash2,
  Plus,
  Sparkles,
  Heart,
  BookOpen,
  Image as ImageIcon,
  Clock,
  MapPin,
  MessageSquare,
  HelpCircle,
  Gift,
  Shirt,
  Home,
  Users,
  Calendar,
  Briefcase,
  Award,
  Music,
  Utensils,
  Camera,
} from "lucide-react";

export type EventType = "WEDDING" | "BAPTISM" | "BIRTHDAY" | "ANNIVERSARY" | "CORPORATE";

export interface TemplateSection {
  id: string;
  type: SectionType;
  name: string;
  description: string;
  icon: any;
  isEnabled: boolean;
  isRequired: boolean;
  order: number;
  eventTypes: EventType[]; // Which event types this section is available for
  config?: Record<string, any>; // Section-specific configuration
}

export type SectionType =
  | "hero"
  | "countdown"
  | "story"
  | "gallery"
  | "schedule"
  | "location"
  | "rsvp"
  | "faq"
  | "registry"
  | "dresscode"
  | "accommodations"
  | "speakers"
  | "sponsors"
  | "team"
  | "menu"
  | "entertainment";

interface SectionBuilderProps {
  eventType: EventType;
  onSectionsChange?: (sections: TemplateSection[]) => void;
}

// Available sections with metadata
const availableSections: Omit<TemplateSection, "id" | "isEnabled" | "order">[] = [
  {
    type: "hero",
    name: "Hero Section",
    description: "Secțiunea principală cu titlu și imagine de fundal",
    icon: Sparkles,
    isRequired: true,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { hasBackgroundImage: true, hasSubtitle: true },
  },
  {
    type: "countdown",
    name: "Countdown Timer",
    description: "Numărătoare inversă până la eveniment",
    icon: Clock,
    isRequired: false,
    eventTypes: ["WEDDING", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { showDays: true, showHours: true, showMinutes: true, showSeconds: true },
  },
  {
    type: "story",
    name: "Povestea Noastră",
    description: "Timeline cu istoria cuplului sau evenimentului",
    icon: BookOpen,
    isRequired: false,
    eventTypes: ["WEDDING", "ANNIVERSARY"],
    config: { maxMilestones: 10 },
  },
  {
    type: "gallery",
    name: "Galerie Foto",
    description: "Colecție de fotografii în grid sau carousel",
    icon: ImageIcon,
    isRequired: false,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { layout: "grid", maxImages: 50 },
  },
  {
    type: "schedule",
    name: "Program Eveniment",
    description: "Agenda detaliat cu timing-uri",
    icon: Calendar,
    isRequired: true,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { showTiming: true, showIcons: true },
  },
  {
    type: "location",
    name: "Locație",
    description: "Hartă și detalii despre locație",
    icon: MapPin,
    isRequired: true,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { showMap: true, showDirections: true },
  },
  {
    type: "rsvp",
    name: "Formular RSVP",
    description: "Confirmare participare online",
    icon: MessageSquare,
    isRequired: true,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { allowPlusOne: true, askDietary: true },
  },
  {
    type: "faq",
    name: "Întrebări Frecvente",
    description: "Răspunsuri la întrebări comune",
    icon: HelpCircle,
    isRequired: false,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY", "CORPORATE"],
    config: { maxQuestions: 10 },
  },
  {
    type: "registry",
    name: "Listă Cadouri",
    description: "Registry links sau cont bancar",
    icon: Gift,
    isRequired: false,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY"],
    config: { showBankAccount: true, showRegistryLinks: true },
  },
  {
    type: "dresscode",
    name: "Dress Code",
    description: "Cod vestimentar și indicații",
    icon: Shirt,
    isRequired: false,
    eventTypes: ["WEDDING", "ANNIVERSARY", "CORPORATE"],
    config: { showExamples: true },
  },
  {
    type: "accommodations",
    name: "Cazare",
    description: "Recomandări de hoteluri",
    icon: Home,
    isRequired: false,
    eventTypes: ["WEDDING", "ANNIVERSARY", "CORPORATE"],
    config: { maxHotels: 5 },
  },
  {
    type: "speakers",
    name: "Speakeri",
    description: "Profile speakeri și prezentatori",
    icon: Users,
    isRequired: false,
    eventTypes: ["CORPORATE"],
    config: { showBio: true, showPhoto: true },
  },
  {
    type: "sponsors",
    name: "Sponsori",
    description: "Logo-uri și info sponsori",
    icon: Award,
    isRequired: false,
    eventTypes: ["CORPORATE"],
    config: { maxSponsors: 10 },
  },
  {
    type: "team",
    name: "Echipa",
    description: "Membrii echipei sau nași",
    icon: Users,
    isRequired: false,
    eventTypes: ["WEDDING", "BAPTISM", "CORPORATE"],
    config: { showRoles: true },
  },
  {
    type: "menu",
    name: "Meniu",
    description: "Meniu servit la eveniment",
    icon: Utensils,
    isRequired: false,
    eventTypes: ["WEDDING", "BAPTISM", "BIRTHDAY", "ANNIVERSARY"],
    config: { showCourses: true },
  },
  {
    type: "entertainment",
    name: "Divertisment",
    description: "Muzică, DJ, activități",
    icon: Music,
    isRequired: false,
    eventTypes: ["WEDDING", "BIRTHDAY", "CORPORATE"],
    config: { showSchedule: true },
  },
];

// Sortable Section Item Component
function SortableSectionItem({ section, onToggle, onConfigure, onRemove }: {
  section: TemplateSection;
  onToggle: (id: string) => void;
  onConfigure: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = section.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl shadow-md border-2 transition-all ${
        section.isEnabled
          ? "border-purple-200 bg-gradient-to-r from-white to-purple-50"
          : "border-gray-200 opacity-60"
      }`}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            section.isEnabled
              ? "bg-gradient-to-br from-purple-500 to-pink-500"
              : "bg-gray-300"
          }`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">{section.name}</h3>
            {section.isRequired && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                Obligatoriu
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{section.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(section.id)}
            className={`p-2 rounded-lg transition-colors ${
              section.isEnabled
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            title={section.isEnabled ? "Dezactivează" : "Activează"}
            disabled={section.isRequired}
          >
            {section.isEnabled ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => onConfigure(section.id)}
            className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
            title="Configurează"
          >
            <Settings className="h-5 w-5" />
          </button>
          {!section.isRequired && (
            <button
              onClick={() => onRemove(section.id)}
              className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
              title="Șterge"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SectionBuilder({
  eventType,
  onSectionsChange,
}: SectionBuilderProps) {
  // Initialize sections based on event type
  const [sections, setSections] = useState<TemplateSection[]>(() => {
    return availableSections
      .filter((s) => s.eventTypes.includes(eventType))
      .map((s, index) => ({
        ...s,
        id: `section-${s.type}-${Date.now()}-${index}`,
        isEnabled: s.isRequired, // Required sections are enabled by default
        order: index,
      }));
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
          ...item,
          order: index,
        }));

        onSectionsChange?.(newItems);
        return newItems;
      });
    }

    setActiveId(null);
  };

  const handleToggle = (id: string) => {
    setSections((items) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, isEnabled: !item.isEnabled } : item
      );
      onSectionsChange?.(newItems);
      return newItems;
    });
  };

  const handleConfigure = (id: string) => {
    // TODO: Open configuration modal for section
    alert(`Configurare secțiune: ${sections.find((s) => s.id === id)?.name}`);
  };

  const handleRemove = (id: string) => {
    if (confirm("Sigur vrei să ștergi această secțiune?")) {
      setSections((items) => {
        const newItems = items.filter((item) => item.id !== id);
        onSectionsChange?.(newItems);
        return newItems;
      });
    }
  };

  const handleAddSection = (sectionType: SectionType) => {
    const template = availableSections.find((s) => s.type === sectionType);
    if (!template) return;

    const newSection: TemplateSection = {
      ...template,
      id: `section-${sectionType}-${Date.now()}`,
      isEnabled: false,
      order: sections.length,
    };

    setSections((items) => {
      const newItems = [...items, newSection];
      onSectionsChange?.(newItems);
      return newItems;
    });

    setShowAddModal(false);
  };

  const availableToAdd = availableSections.filter(
    (s) =>
      s.eventTypes.includes(eventType) &&
      !sections.some((sec) => sec.type === s.type)
  );

  const activeSection = sections.find((s) => s.id === activeId);

  const enabledCount = sections.filter((s) => s.isEnabled).length;
  const requiredCount = sections.filter((s) => s.isRequired).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{sections.length}</div>
          <div className="text-sm opacity-90">Secțiuni Totale</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{enabledCount}</div>
          <div className="text-sm opacity-90">Activate</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{requiredCount}</div>
          <div className="text-sm opacity-90">Obligatorii</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              Cum să folosești Section Builder
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Trage și plasează secțiunile pentru a le reordona</li>
              <li>• Click pe 👁️ pentru a activa/dezactiva o secțiune</li>
              <li>• Click pe ⚙️ pentru a configura conținutul secțiunii</li>
              <li>• Secțiunile obligatorii nu pot fi dezactivate sau șterse</li>
              <li>• Adaugă secțiuni noi cu butonul "+" de mai jos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Section Button */}
      {availableToAdd.length > 0 && (
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Adaugă Secțiune Nouă ({availableToAdd.length} disponibile)
        </button>
      )}

      {/* Sections List with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <SortableSectionItem
                key={section.id}
                section={section}
                onToggle={handleToggle}
                onConfigure={handleConfigure}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeSection && (
            <div className="bg-white rounded-xl shadow-2xl border-2 border-purple-500 p-4 opacity-90">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <activeSection.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {activeSection.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activeSection.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Adaugă Secțiune Nouă
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {availableToAdd.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.type}
                    onClick={() => handleAddSection(section.type)}
                    className="text-left p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 flex items-center justify-center transition-all">
                        <Icon className="h-5 w-5 text-gray-600 group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">
                          {section.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Preview Summary */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-purple-600" />
          Previzualizare Ordine Secțiuni
        </h3>
        <ol className="space-y-2">
          {sections
            .filter((s) => s.isEnabled)
            .map((section, index) => (
              <li key={section.id} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span className="text-gray-700">{section.name}</span>
                {section.isRequired && (
                  <span className="text-xs text-red-600">(obligatoriu)</span>
                )}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
