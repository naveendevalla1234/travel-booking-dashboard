import {
  DollarSign,
  CalendarDays,
  CheckCircle,
  Clock,
  Plus,
  Plane,
  Users,
  CreditCard,
  TrendingUp,
  MapPin,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import StatusBadge from "../components/StatusBadge";

const revenueData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 14500 },
  { month: "Mar", value: 13200 },
  { month: "Apr", value: 17800 },
  { month: "May", value: 19500 },
  { month: "Jun", value: 22400 },
];

function Dashboard({
  data,
  stats,
  setActivePage,
}) {
  const cards = [
    ["Total Revenue", `$${stats.revenue.toLocaleString()}`, "+12.5%", DollarSign],
    ["Total Bookings", data.bookings.length, "+8.2%", CalendarDays],
    ["Confirmed Trips", stats.confirmed, "+5.4%", CheckCircle],
    ["Pending Bookings", stats.pending, "+2.1%", Clock],
  ];

  const bookingChart = [
    {
      name: "Confirmed",
      value: stats.confirmed,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "Cancelled",
      value: 2,
    },
  ];

  return (
    <>
      <section className="welcome-card">
        <div>
          <span className="eyebrow">
            TRAVEL MANAGEMENT
          </span>

          <h1>Welcome back, Naveen 👋</h1>

          <p>
            Manage your trips, bookings and customers
            from one place.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            className="secondary-btn"
            onClick={() => setActivePage("Calendar")}
          >
            <CalendarDays size={17} />
            Calendar
          </button>

          <button
            className="primary-btn"
            onClick={() => setActivePage("Trips")}
          >
            <Plus size={17} />
            Add Trip
          </button>
        </div>
      </section>

      <div className="stats-grid">
        {cards.map(([title, value, change, Icon]) => (
          <div className="stat-card" key={title}>
            <div className="stat-row">
              <div className="stat-icon">
                <Icon size={20} />
              </div>

              <span className="growth">
                {change}
              </span>
            </div>

            <p>{title}</p>

            <h2>{value}</h2>

            <small>
              Compared with last month
            </small>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Access your most-used tools.</p>
        </div>
      </div>

      <div className="quick-grid">
        {[
          ["Trips", Plane, "Manage your trips"],
          ["Bookings", CalendarDays, "Manage bookings"],
          ["Customers", Users, "Manage customers"],
          ["Payments", CreditCard, "Track payments"],
        ].map(([name, Icon, text]) => (
          <button
            className="quick-card"
            key={name}
            onClick={() => setActivePage(name)}
          >
            <div className="quick-icon">
              <Icon size={21} />
            </div>

            <div>
              <strong>{name}</strong>
              <span>{text}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="chart-grid">
        <div className="card chart-card">
          <div className="card-heading">
            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>

            <TrendingUp size={19} />
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#dbeafe"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-heading">
            <div>
              <h3>Booking Status</h3>
              <p>Current distribution</p>
            </div>
          </div>

          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>Popular Destinations</h2>
          <p>Most booked destinations.</p>
        </div>

        <button
          className="text-btn"
          onClick={() => setActivePage("Destinations")}
        >
          View All
        </button>
      </div>

      <div className="destination-grid">
        {data.destinations.map((destination) => (
          <div
            className="destination-card"
            key={destination.id}
          >
            <img
              src={destination.image}
              alt={destination.name}
            />

            <div className="destination-overlay">
              <h3>{destination.name}</h3>

              <p>
                <MapPin size={13} />
                {destination.country}
              </p>

              <span>
                {destination.trips} trips
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-grid">
        <div className="card">
          <div className="card-heading">
            <div>
              <h3>Recent Bookings</h3>
              <p>Latest customer bookings.</p>
            </div>

            <button
              className="text-btn"
              onClick={() => setActivePage("Bookings")}
            >
              View All
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Trip</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.bookings.slice(0, 5).map(
                  (booking) => (
                    <tr key={booking.id}>
                      <td>{booking.customer}</td>
                      <td>{booking.trip}</td>
                      <td>
                        ${booking.amount.toLocaleString()}
                      </td>
                      <td>
                        <StatusBadge
                          status={booking.status}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-heading">
            <div>
              <h3>Upcoming Trips</h3>
              <p>Next scheduled journeys.</p>
            </div>
          </div>

          <div className="upcoming-list">
            {data.trips.slice(0, 5).map((trip) => (
              <div
                className="upcoming-item"
                key={trip.id}
              >
                <div className="date-box">
                  <strong>
                    {new Date(trip.date).getDate()}
                  </strong>

                  <span>
                    {new Date(
                      trip.date
                    ).toLocaleString("en", {
                      month: "short",
                    })}
                  </span>
                </div>

                <div>
                  <strong>{trip.trip}</strong>

                  <small>
                    <MapPin size={12} />
                    {trip.destination}
                  </small>
                </div>

                <StatusBadge
                  status={trip.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;