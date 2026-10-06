import { useMemo, useState } from "react";
import { Bell, Menu, Plane } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Destinations from "./pages/Destinations";
import Trips from "./pages/Trips";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Calendar from "./pages/Calendar";

import { initialData } from "./data/mockData";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [data, setData] = useState(initialData);

  const notify = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const updateData = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const stats = useMemo(() => {
    const revenue = data.bookings.reduce(
      (sum, booking) => sum + Number(booking.amount),
      0
    );

    return {
      revenue,
      confirmed: data.bookings.filter(
        (item) => item.status === "Confirmed"
      ).length,
      pending: data.bookings.filter(
        (item) => item.status === "Pending"
      ).length,
    };
  }, [data.bookings]);

  const commonProps = {
    data,
    updateData,
    notify,
    setActivePage,
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-btn mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="mobile-brand">
              <Plane size={18} />
              TravelBook
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={18} />
              <span className="notification-dot" />
            </button>

            <div className="profile">
              <div className="avatar">N</div>

              <div>
                <strong>Naveen</strong>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          {activePage === "Dashboard" && (
            <Dashboard {...commonProps} stats={stats} />
          )}

          {activePage === "Destinations" && (
            <Destinations {...commonProps} />
          )}

          {activePage === "Trips" && <Trips {...commonProps} />}

          {activePage === "Customers" && (
            <Customers {...commonProps} />
          )}

          {activePage === "Bookings" && (
            <Bookings {...commonProps} />
          )}

          {activePage === "Payments" && (
            <Payments {...commonProps} />
          )}

          {activePage === "Calendar" && (
            <Calendar {...commonProps} />
          )}
        </main>
      </div>

      {toast && (
        <Toast
          {...toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;