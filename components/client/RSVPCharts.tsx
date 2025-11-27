"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface RSVPData {
  id: string;
  guestName: string;
  status: "ATTENDING" | "NOT_ATTENDING" | "MAYBE";
  numberOfGuests: number;
  createdAt: string;
  message?: string;
}

interface RSVPChartsProps {
  rsvps: RSVPData[];
}

export default function RSVPCharts({ rsvps }: RSVPChartsProps) {
  // Calculate stats
  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.status === "ATTENDING").length,
    notAttending: rsvps.filter((r) => r.status === "NOT_ATTENDING").length,
    maybe: rsvps.filter((r) => r.status === "MAYBE").length,
    totalGuests: rsvps
      .filter((r) => r.status === "ATTENDING")
      .reduce((sum, r) => sum + r.numberOfGuests, 0),
    withMessage: rsvps.filter((r) => r.message && r.message.trim().length > 0)
      .length,
  };

  const responseRate =
    stats.total > 0 ? ((stats.attending / stats.total) * 100).toFixed(1) : "0";

  // Donut chart data
  const donutData = [
    { name: "Participă", value: stats.attending, color: "#10b981" },
    { name: "Nu participă", value: stats.notAttending, color: "#ef4444" },
    { name: "Poate", value: stats.maybe, color: "#f59e0b" },
  ];

  // Confirmations over time (group by day)
  const confirmationsByDate: { [key: string]: number } = {};
  rsvps.forEach((rsvp) => {
    const date = new Date(rsvp.createdAt).toLocaleDateString("ro-RO", {
      month: "short",
      day: "numeric",
    });
    confirmationsByDate[date] = (confirmationsByDate[date] || 0) + 1;
  });

  const timelineData = Object.entries(confirmationsByDate)
    .map(([date, count]) => ({ date, count }))
    .slice(-10); // Last 10 days

  // Recent confirmations (last 5)
  const recentConfirmations = [...rsvps]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Guests distribution data
  const guestsDistribution = rsvps
    .filter((r) => r.status === "ATTENDING")
    .reduce((acc: { [key: number]: number }, rsvp) => {
      acc[rsvp.numberOfGuests] = (acc[rsvp.numberOfGuests] || 0) + 1;
      return acc;
    }, {});

  const guestsData = Object.entries(guestsDistribution).map(
    ([guests, count]) => ({
      guests: `${guests} ${Number(guests) === 1 ? "persoană" : "persoane"}`,
      count,
    })
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ATTENDING":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "NOT_ATTENDING":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "MAYBE":
        return <Clock className="h-4 w-4 text-yellow-500" />;
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
        return "text-green-600";
      case "NOT_ATTENDING":
        return "text-red-600";
      case "MAYBE":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Highlight Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.attending}</div>
          <div className="text-sm opacity-90">Confirmări Pozitive</div>
          <div className="mt-2 text-xs opacity-75">
            {stats.totalGuests} invitați totali
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <Users className="h-8 w-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.total}</div>
          <div className="text-sm opacity-90">Total Răspunsuri</div>
          <div className="mt-2 text-xs opacity-75">Rata: {responseRate}%</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="h-8 w-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.withMessage}</div>
          <div className="text-sm opacity-90">Cu Mesaje</div>
          <div className="mt-2 text-xs opacity-75">
            {stats.total > 0
              ? ((stats.withMessage / stats.total) * 100).toFixed(0)
              : 0}
            % au lăsat mesaj
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-8 w-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.maybe}</div>
          <div className="text-sm opacity-90">Nedecisi</div>
          <div className="mt-2 text-xs opacity-75">Necesită follow-up</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donut Chart - Status Distribution */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Distribuția Răspunsurilor
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
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
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            {donutData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stats.total > 0
                      ? ((item.value / stats.total) * 100).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Confirmations Over Time */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Confirmări în Timp
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#e5e7eb"
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                stroke="#e5e7eb"
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => [`${value} răspunsuri`, "Count"]}
              />
              <Bar dataKey="count" fill="#f43f5e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Guest Distribution */}
          {guestsData.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Distribuție Număr Invitați
              </h4>
              <div className="space-y-2">
                {guestsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{item.guests}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-purple-600"
                          style={{
                            width: `${(item.count / stats.attending) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 w-8 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Confirmations Timeline */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Confirmări Recente
          </h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {recentConfirmations.length > 0 ? (
            recentConfirmations.map((rsvp, index) => (
              <div
                key={rsvp.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      rsvp.status === "ATTENDING"
                        ? "bg-green-100"
                        : rsvp.status === "NOT_ATTENDING"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {getStatusIcon(rsvp.status)}
                  </div>
                  {index < recentConfirmations.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {rsvp.guestName}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-sm font-semibold ${getStatusColor(
                            rsvp.status
                          )}`}
                        >
                          {getStatusText(rsvp.status)}
                        </span>
                        {rsvp.status === "ATTENDING" && (
                          <span className="text-sm text-gray-600">
                            • {rsvp.numberOfGuests}{" "}
                            {rsvp.numberOfGuests === 1 ? "persoană" : "persoane"}
                          </span>
                        )}
                      </div>
                      {rsvp.message && (
                        <div className="mt-2 text-sm text-gray-600 italic">
                          "{rsvp.message}"
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {new Date(rsvp.createdAt).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      {new Date(rsvp.createdAt).toLocaleTimeString("ro-RO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nicio confirmare încă
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
