import React from "react";
import { Search, Bell, User } from "lucide-react";

export default function Header({ title = "Dashboard" }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>
        <p className="text-sm text-gray-500">
          Travel Booking Dashboard
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-lg p-2 hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={18} />
          </div>

          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </button>

      </div>
    </header>
  );
}