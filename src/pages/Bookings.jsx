import { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";

import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

function Bookings({ data }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const bookings = useMemo(() => {
    return data.bookings.filter((booking) => {
      const text =
        `${booking.id} ${booking.customer} ${booking.trip}`
          .toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (status === "All" ||
          booking.status === status)
      );
    });
  }, [data.bookings, search, status]);

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">RESERVATIONS</span>
          <h1>Bookings</h1>
          <p>Manage bookings and payment status.</p>
        </div>
      </div>

      <div className="filter-card">
        <div className="search-box">
          <Search size={17} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search bookings..."
          />
        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="card table-card">
        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Trip</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.id}</strong>
                    </td>

                    <td>{booking.customer}</td>

                    <td>{booking.trip}</td>

                    <td>
                      {new Date(
                        booking.date
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      ${booking.amount.toLocaleString()}
                    </td>

                    <td>
                      <StatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td>
                      <StatusBadge
                        status={booking.paymentStatus}
                      />
                    </td>

                    <td>
                      <button
                        className="table-icon"
                        onClick={() =>
                          setSelected(booking)
                        }
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <Modal
          title="Booking Details"
          onClose={() => setSelected(null)}
          onSubmit={() => setSelected(null)}
          submitText="Close"
        >
          <div className="details-grid">
            <div>
              <small>Booking ID</small>
              <strong>{selected.id}</strong>
            </div>

            <div>
              <small>Customer</small>
              <strong>{selected.customer}</strong>
            </div>

            <div>
              <small>Trip</small>
              <strong>{selected.trip}</strong>
            </div>

            <div>
              <small>Destination</small>
              <strong>{selected.destination}</strong>
            </div>

            <div>
              <small>Booking Status</small>
              <StatusBadge
                status={selected.status}
              />
            </div>

            <div>
              <small>Payment Status</small>
              <StatusBadge
                status={selected.paymentStatus}
              />
            </div>

            <div>
              <small>Total Amount</small>
              <strong>
                ${selected.amount.toLocaleString()}
              </strong>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Bookings;