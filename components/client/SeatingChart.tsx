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
  Plus,
  Minus,
  Users,
  Download,
  Save,
  RotateCcw,
  Grid,
  User,
  X,
  Settings as SettingsIcon,
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  email: string;
  numberOfGuests: number;
  tableId?: string;
}

interface Table {
  id: string;
  number: number;
  capacity: number;
  x: number;
  y: number;
  guests: Guest[];
}

interface SeatingChartProps {
  guests: Guest[];
}

export default function SeatingChart({ guests: initialGuests }: SeatingChartProps) {
  const [tables, setTables] = useState<Table[]>([
    { id: "table-1", number: 1, capacity: 8, x: 100, y: 100, guests: [] },
    { id: "table-2", number: 2, capacity: 8, x: 300, y: 100, guests: [] },
    { id: "table-3", number: 3, capacity: 8, x: 500, y: 100, guests: [] },
    { id: "table-4", number: 4, capacity: 8, x: 100, y: 300, guests: [] },
    { id: "table-5", number: 5, capacity: 8, x: 300, y: 300, guests: [] },
    { id: "table-6", number: 6, capacity: 8, x: 500, y: 300, guests: [] },
  ]);

  const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>(initialGuests);
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [tableCapacity, setTableCapacity] = useState(8);
  const [numTables, setNumTables] = useState(6);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const guestId = active.id as string;

    // Find guest in unassigned or in tables
    let guest = unassignedGuests.find((g) => g.id === guestId);
    if (!guest) {
      tables.forEach((table) => {
        const foundGuest = table.guests.find((g) => g.id === guestId);
        if (foundGuest) guest = foundGuest;
      });
    }

    if (guest) {
      setActiveGuest(guest);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveGuest(null);

    if (!over) return;

    const guestId = active.id as string;
    const targetId = over.id as string;

    // Find the guest
    let guest = unassignedGuests.find((g) => g.id === guestId);
    let sourceTableId: string | undefined;

    if (!guest) {
      tables.forEach((table) => {
        const foundGuest = table.guests.find((g) => g.id === guestId);
        if (foundGuest) {
          guest = foundGuest;
          sourceTableId = table.id;
        }
      });
    }

    if (!guest) return;

    // If dropping on unassigned area
    if (targetId === "unassigned") {
      if (sourceTableId) {
        // Remove from table
        setTables((prev) =>
          prev.map((table) =>
            table.id === sourceTableId
              ? { ...table, guests: table.guests.filter((g) => g.id !== guestId) }
              : table
          )
        );
        // Add to unassigned
        setUnassignedGuests((prev) => [...prev, { ...guest!, tableId: undefined }]);
      }
      return;
    }

    // If dropping on a table
    const targetTable = tables.find((t) => t.id === targetId);
    if (!targetTable) return;

    // Check capacity
    const currentOccupancy = targetTable.guests.reduce(
      (sum, g) => sum + g.numberOfGuests,
      0
    );
    if (currentOccupancy + guest.numberOfGuests > targetTable.capacity) {
      alert(
        `Masa ${targetTable.number} nu are suficient spațiu! (Capacitate: ${targetTable.capacity}, Ocupată: ${currentOccupancy})`
      );
      return;
    }

    // Remove from source
    if (sourceTableId) {
      setTables((prev) =>
        prev.map((table) =>
          table.id === sourceTableId
            ? { ...table, guests: table.guests.filter((g) => g.id !== guestId) }
            : table
        )
      );
    } else {
      setUnassignedGuests((prev) => prev.filter((g) => g.id !== guestId));
    }

    // Add to target table
    setTables((prev) =>
      prev.map((table) =>
        table.id === targetId
          ? { ...table, guests: [...table.guests, { ...guest!, tableId: targetId }] }
          : table
      )
    );
  };

  const handleDragCancel = () => {
    setActiveGuest(null);
  };

  const addTable = () => {
    const newNumber = tables.length + 1;
    const newTable: Table = {
      id: `table-${newNumber}`,
      number: newNumber,
      capacity: tableCapacity,
      x: 100 + (newNumber % 3) * 200,
      y: 100 + Math.floor((newNumber - 1) / 3) * 200,
      guests: [],
    };
    setTables([...tables, newTable]);
    setNumTables(newNumber);
  };

  const removeTable = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (table && table.guests.length > 0) {
      // Move guests back to unassigned
      setUnassignedGuests((prev) => [
        ...prev,
        ...table.guests.map((g) => ({ ...g, tableId: undefined })),
      ]);
    }
    setTables((prev) => prev.filter((t) => t.id !== tableId));
    setNumTables((prev) => prev - 1);
  };

  const resetAll = () => {
    if (
      !confirm(
        "Ești sigur că vrei să resetezi toate aranjamentele? Toți invitații vor fi returnați în lista de nealocați."
      )
    )
      return;

    const allGuests = [
      ...unassignedGuests,
      ...tables.flatMap((t) => t.guests.map((g) => ({ ...g, tableId: undefined }))),
    ];
    setUnassignedGuests(allGuests);
    setTables((prev) => prev.map((t) => ({ ...t, guests: [] })));
  };

  const exportPDF = () => {
    alert("Funcția de export PDF va fi implementată în viitor!");
  };

  const saveArrangement = () => {
    // TODO: Save to backend
    alert("Aranjament salvat cu succes!");
  };

  const getTableOccupancy = (table: Table) => {
    const occupied = table.guests.reduce((sum, g) => sum + g.numberOfGuests, 0);
    return { occupied, capacity: table.capacity, percentage: (occupied / table.capacity) * 100 };
  };

  const getTotalStats = () => {
    const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);
    const totalAssigned = tables.reduce(
      (sum, t) => sum + t.guests.reduce((s, g) => s + g.numberOfGuests, 0),
      0
    );
    const totalUnassigned = unassignedGuests.reduce(
      (sum, g) => sum + g.numberOfGuests,
      0
    );
    return { totalCapacity, totalAssigned, totalUnassigned };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Aranjament Mese</h3>
            <p className="text-white/90">
              Organizează invitații la mese prin drag-and-drop
            </p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <SettingsIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{tables.length}</div>
            <div className="text-sm text-white/80">Mese Totale</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.totalCapacity}</div>
            <div className="text-sm text-white/80">Capacitate Totală</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-300">
              {stats.totalAssigned}
            </div>
            <div className="text-sm text-white/80">Invitați Alocați</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-300">
              {stats.totalUnassigned}
            </div>
            <div className="text-sm text-white/80">Nealocați</div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-purple-200">
          <h4 className="font-bold text-gray-800 mb-4">Setări Configurare</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Capacitate Mese Noi
              </label>
              <input
                type="number"
                value={tableCapacity}
                onChange={(e) => setTableCapacity(parseInt(e.target.value))}
                min="4"
                max="20"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={addTable}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Adaugă Masă</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={saveArrangement}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Save className="h-5 w-5" />
          <span>Salvează Aranjamentul</span>
        </button>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Export PDF</span>
        </button>
        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Resetează Tot</span>
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Unassigned Guests Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Invitați Nealocați</h4>
                  <p className="text-sm text-gray-600">
                    {unassignedGuests.length} invitați ({stats.totalUnassigned} persoane)
                  </p>
                </div>
              </div>

              <div
                id="unassigned"
                className="space-y-2 max-h-[600px] overflow-y-auto"
              >
                {unassignedGuests.map((guest) => (
                  <DraggableGuest key={guest.id} guest={guest} />
                ))}
                {unassignedGuests.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Toți invitații sunt alocați!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seating Chart Visual */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <Grid className="h-5 w-5 text-purple-500" />
                  Plan Sală
                </h4>
                <div className="text-sm text-gray-600">
                  Trage invitații pe mese pentru a-i aseza
                </div>
              </div>

              <div className="relative bg-gray-50 rounded-xl p-8 min-h-[700px] border-2 border-dashed border-gray-300">
                {tables.map((table) => {
                  const occupancy = getTableOccupancy(table);
                  return (
                    <DroppableTable
                      key={table.id}
                      table={table}
                      occupancy={occupancy}
                      onRemove={removeTable}
                    />
                  );
                })}

                {tables.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Grid className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">Nicio masă configurată</p>
                      <p className="text-sm">
                        Adaugă mese folosind butonul din setări
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeGuest ? (
            <div className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg cursor-grabbing">
              <div className="font-semibold">{activeGuest.name}</div>
              <div className="text-sm">
                {activeGuest.numberOfGuests}{" "}
                {activeGuest.numberOfGuests === 1 ? "persoană" : "persoane"}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Draggable Guest Component
function DraggableGuest({ guest }: { guest: Guest }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      id={guest.id}
      className={`p-3 bg-gradient-to-r from-rose-100 to-purple-100 rounded-lg border-2 border-rose-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{guest.name}</div>
          <div className="text-sm text-gray-600">{guest.email}</div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-full text-sm font-semibold text-gray-700">
          <User className="h-4 w-4" />
          <span>{guest.numberOfGuests}</span>
        </div>
      </div>
    </div>
  );
}

// Droppable Table Component
function DroppableTable({
  table,
  occupancy,
  onRemove,
}: {
  table: Table;
  occupancy: { occupied: number; capacity: number; percentage: number };
  onRemove: (tableId: string) => void;
}) {
  const isOverCapacity = occupancy.percentage > 100;
  const isNearCapacity = occupancy.percentage > 80 && occupancy.percentage <= 100;

  return (
    <div
      id={table.id}
      className="absolute"
      style={{ left: table.x, top: table.y }}
    >
      <div
        className={`w-48 rounded-2xl shadow-lg transition-all hover:shadow-xl ${
          isOverCapacity
            ? "bg-red-100 border-4 border-red-400"
            : isNearCapacity
            ? "bg-yellow-100 border-4 border-yellow-400"
            : "bg-white border-4 border-purple-300"
        }`}
      >
        {/* Table Header */}
        <div
          className={`p-3 rounded-t-xl flex items-center justify-between ${
            isOverCapacity
              ? "bg-red-400"
              : isNearCapacity
              ? "bg-yellow-400"
              : "bg-gradient-to-r from-rose-400 to-purple-500"
          }`}
        >
          <div className="text-white font-bold">Masa {table.number}</div>
          <button
            onClick={() => onRemove(table.id)}
            className="p-1 bg-white/20 hover:bg-white/40 rounded transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Capacity Bar */}
        <div className="px-3 pt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Ocupare</span>
            <span className="font-semibold">
              {occupancy.occupied}/{occupancy.capacity}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isOverCapacity
                  ? "bg-red-500"
                  : isNearCapacity
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(occupancy.percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Guests List */}
        <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
          {table.guests.map((guest) => (
            <div
              key={guest.id}
              className="p-2 bg-purple-50 rounded-lg text-sm"
              draggable
              id={guest.id}
            >
              <div className="font-semibold text-gray-800 truncate">
                {guest.name}
              </div>
              <div className="text-xs text-gray-600 flex items-center gap-1">
                <User className="h-3 w-3" />
                {guest.numberOfGuests}{" "}
                {guest.numberOfGuests === 1 ? "persoană" : "persoane"}
              </div>
            </div>
          ))}
          {table.guests.length === 0 && (
            <div className="text-center py-4 text-gray-400 text-sm">
              Masă goală
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
