"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Calendar, TrendingUp, DollarSign } from "lucide-react";

// Mock data - în producție, acest lucru va veni din API/database
const monthlyRevenueData = [
  { month: "Ian", revenue: 28500, events: 32 },
  { month: "Feb", revenue: 31200, events: 35 },
  { month: "Mar", revenue: 35800, events: 41 },
  { month: "Apr", revenue: 42100, events: 48 },
  { month: "Mai", revenue: 51300, events: 59 },
  { month: "Iun", revenue: 68400, events: 78 },
  { month: "Iul", revenue: 72900, events: 83 },
  { month: "Aug", revenue: 65200, events: 74 },
  { month: "Sep", revenue: 58700, events: 67 },
  { month: "Oct", revenue: 48200, events: 55 },
  { month: "Nov", revenue: 41800, events: 48 },
  { month: "Dec", revenue: 42400, events: 49 },
];

const revenueByEventType = [
  { type: "Nuntă", revenue: 245000, events: 245, color: "#f43f5e" },
  { type: "Botez", revenue: 132000, events: 132, color: "#a855f7" },
  { type: "Aniversare", revenue: 68000, events: 68, color: "#ec4899" },
  { type: "Zi de naștere", revenue: 28513, events: 29, color: "#f472b6" },
  { type: "Corporativ", revenue: 13000, events: 13, color: "#6366f1" },
];

const weeklyData = [
  { day: "Lun", revenue: 8500 },
  { day: "Mar", revenue: 12200 },
  { day: "Mie", revenue: 9800 },
  { day: "Joi", revenue: 15400 },
  { day: "Vin", revenue: 18900 },
  { day: "Sâm", revenue: 21300 },
  { day: "Dum", revenue: 16700 },
];

const last30DaysData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: Math.floor(Math.random() * 5000) + 2000,
}));

const last90DaysData = Array.from({ length: 90 }, (_, i) => ({
  day: i + 1,
  revenue: Math.floor(Math.random() * 5000) + 2000,
}));

type PeriodType = "7days" | "30days" | "90days" | "year" | "custom";

export default function RevenueCharts() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("year");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const periods: { id: PeriodType; label: string }[] = [
    { id: "7days", label: "Ultimele 7 zile" },
    { id: "30days", label: "Ultimele 30 zile" },
    { id: "90days", label: "Ultimele 90 zile" },
    { id: "year", label: "An curent" },
    { id: "custom", label: "Personalizat" },
  ];

  const getChartData = () => {
    switch (selectedPeriod) {
      case "7days":
        return weeklyData;
      case "30days":
        return last30DaysData;
      case "90days":
        return last90DaysData;
      case "year":
        return monthlyRevenueData;
      default:
        return monthlyRevenueData;
    }
  };

  const getXAxisKey = () => {
    switch (selectedPeriod) {
      case "7days":
        return "day";
      case "30days":
      case "90days":
        return "day";
      case "year":
        return "month";
      default:
        return "month";
    }
  };

  const exportToCSV = () => {
    const data = getChartData();
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `venituri_${selectedPeriod}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    // Aici ar fi logica pentru export PDF
    // Poți folosi o bibliotecă precum jsPDF sau html2pdf
    alert("Export PDF va fi implementat cu jsPDF");
  };

  const totalRevenue = revenueByEventType.reduce((sum, item) => sum + item.revenue, 0);
  const totalEvents = revenueByEventType.reduce((sum, item) => sum + item.events, 0);
  const avgRevenuePerEvent = Math.round(totalRevenue / totalEvents);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalRevenue.toLocaleString()} MDL</div>
          <div className="text-sm opacity-90">Venit Total</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalEvents}</div>
          <div className="text-sm opacity-90">Total Evenimente</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{avgRevenuePerEvent.toLocaleString()} MDL</div>
          <div className="text-sm opacity-90">Medie / Eveniment</div>
        </div>
      </div>

      {/* Revenue Over Time Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Evoluția Veniturilor</h2>
            <p className="text-sm text-gray-600">Venituri în funcție de perioadă</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Period Selector */}
            <div className="flex gap-2 flex-wrap">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriod(period.id);
                    if (period.id === "custom") {
                      setShowCustomDatePicker(true);
                    } else {
                      setShowCustomDatePicker(false);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedPeriod === period.id
                      ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                <Download className="h-4 w-4" />
                CSV
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
              >
                <Download className="h-4 w-4" />
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Custom Date Range Picker */}
        {showCustomDatePicker && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data Start
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data Sfârșit
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                onClick={() => {
                  if (customStartDate && customEndDate) {
                    alert(`Filtrare între ${customStartDate} și ${customEndDate}`);
                  }
                }}
              >
                Aplică
              </button>
            </div>
          </div>
        )}

        {/* Line Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey={getXAxisKey()}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              stroke="#e5e7eb"
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              stroke="#e5e7eb"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} MDL`, "Venit"]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorRevenue)"
              strokeWidth={3}
              dot={{ fill: "#f43f5e", r: 5 }}
              activeDot={{ r: 7 }}
              name="Venit (MDL)"
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Event Type Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Venituri pe Tip Eveniment</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueByEventType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="type"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#e5e7eb"
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#e5e7eb"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} MDL`, "Venit"]}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]} name="Venit (MDL)">
                {revenueByEventType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Distribuție Venituri</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={revenueByEventType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.type}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="revenue"
              >
                {revenueByEventType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} MDL`, "Venit"]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend with Stats */}
          <div className="mt-6 space-y-3">
            {revenueByEventType.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-semibold text-gray-700">{item.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">
                    {item.revenue.toLocaleString()} MDL
                  </div>
                  <div className="text-xs text-gray-600">{item.events} evenimente</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
