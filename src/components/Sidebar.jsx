import {
  LayoutDashboard,
  Map,
  Plane,
  Users,
  CalendarCheck,
  CreditCard,
  CalendarDays,
  X,
} from "lucide-react";

const menu = [
  ["Dashboard", LayoutDashboard],
  ["Destinations", Map],
  ["Trips", Plane],
  ["Customers", Users],
  ["Bookings", CalendarCheck],
  ["Payments", CreditCard],
  ["Calendar", CalendarDays],
];

function Sidebar({
  activePage,
  setActivePage,
  open,
  setOpen,
}) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <Plane size={20} />
        </div>

        <div>
          <strong>TravelBook</strong>
          <small>Management</small>
        </div>

        <button
          className="sidebar-close"
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <div className="menu-label">
        MAIN MENU
      </div>

      <nav>
        {menu.map(([name, Icon]) => (
          <button
            key={name}
            className={
              activePage === name ? "menu-active" : ""
            }
            onClick={() => {
              setActivePage(name);
              setOpen(false);
            }}
          >
            <Icon size={18} />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="support-card">
          <strong>Need help?</strong>
          <span>Contact TravelBook support</span>
          <button>Contact Support</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;