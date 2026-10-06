import React from "react";
import {
  Users,
  CalendarCheck,
  DollarSign,
  Plane,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const icons = {
  users: Users,
  bookings: CalendarCheck,
  revenue: DollarSign,
  trips: Plane,
};

export default function StatCard({
  title,
  value,
  change,
  changeType = "up",
  icon = "bookings",
  subtitle,
}) {
  const Icon = icons[icon] || CalendarCheck;
  const isPositive = changeType === "up";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        
        {/* Title */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <Icon size={22} className="text-blue-600" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-4 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          {change}
        </div>

        <span className="text-sm text-gray-400">
          {subtitle || "from last month"}
        </span>
      </div>
    </div>
  );
}